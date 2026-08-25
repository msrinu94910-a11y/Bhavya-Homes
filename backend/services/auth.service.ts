import { User, IUser, UserRole } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export class AuthService {
  static async registerCustomer(userData: Partial<IUser>) {
    const existing = await User.findOne({ email: userData.email?.toLowerCase() });
    if (existing) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await hashPassword(userData.password!);
    const user = await User.create({
      ...userData,
      email: userData.email?.toLowerCase(),
      password: hashedPassword,
      role: UserRole.CUSTOMER,
    });

    const token = generateToken({ id: user._id.toString(), role: user.role, email: user.email });
    return { user: this.sanitizeUser(user), token };
  }

  static async login(email: string, pass: string) {
    const user = await User.findOne({ email: email.toLowerCase(), isDeleted: false }).select('+password');
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await comparePassword(pass, user.password!);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('Account is inactive. Please contact support.');
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = generateToken({ id: user._id.toString(), role: user.role, email: user.email });
    return { user: this.sanitizeUser(user), token };
  }

  static sanitizeUser(user: IUser) {
    const obj = user.toObject ? user.toObject() : { ...user };
    delete obj.password;
    return obj;
  }
}

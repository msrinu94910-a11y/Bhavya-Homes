import { User, IUser, UserRole, UserStatus } from '../models/User.js';
import { ActivityLog } from '../models/ActivityLog.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export class AuthService {
  static async registerCustomer(userData: Partial<IUser>) {
    const cleanEmail = userData.email?.toLowerCase().trim();
    const existing = await User.findOne({ email: cleanEmail, isDeleted: { $ne: true } });
    if (existing) {
      throw new Error('An account with this email address is already registered');
    }

    const hashedPassword = await hashPassword(userData.password!);
    const isAgentRole = userData.role === UserRole.AGENT || String(userData.role) === 'AGENT';

    if (isAgentRole) {
      throw new Error('Agent accounts cannot be created via public registration. Only Administrators can register new Agents from the Admin Portal.');
    }

    // Customer Registration
    const userId = `USR-${Date.now().toString().slice(-6)}`;
    const defaultAgent = await User.findOne({ role: UserRole.AGENT, status: UserStatus.ACTIVE, isDeleted: { $ne: true } });

    const user = await User.create({
      ...userData,
      userId,
      email: cleanEmail,
      phone: userData.phone?.trim() || '+91 98765 00000',
      password: hashedPassword,
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
      isActive: true,
      assignedAgent: defaultAgent ? defaultAgent._id : undefined,
      assignedAgentCode: defaultAgent ? (defaultAgent.agentCode || 'BH-AGT-101') : '',
      assignedAgentName: defaultAgent ? defaultAgent.name : '',
    });

    if (defaultAgent) {
      defaultAgent.totalCustomers = (defaultAgent.totalCustomers || 0) + 1;
      await defaultAgent.save();
    }

    await ActivityLog.create({
      user: user._id,
      userName: user.name,
      userRole: 'CUSTOMER',
      action: 'CUSTOMER_REGISTERED',
      description: `New customer registered: ${user.name} (${user.email})`,
      metadata: { userId: user.userId, email: user.email },
    });

    const token = generateToken({ id: user._id.toString(), role: user.role, email: user.email });
    return { user: this.sanitizeUser(user), token };
  }

  static async login(email: string, pass: string) {
    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail, isDeleted: { $ne: true } }).select('+password');
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await comparePassword(pass, user.password!);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive || user.status === UserStatus.BLOCKED) {
      throw new Error('Account is inactive or blocked. Please contact support.');
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

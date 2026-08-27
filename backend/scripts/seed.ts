import mongoose from 'mongoose';
import { User, UserRole } from '../models/User.js';
import { Property, PropertyType, PropertyStatus, AreaUnit } from '../models/Property.js';
import { Project, ProjectType, ProjectStatus } from '../models/Project.js';
import { Inquiry, InquirySource, InquiryStatus } from '../models/Inquiry.js';
import { config } from '../config/environment.js';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB database...');
    await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected successfully to MongoDB Atlas cluster!');

    // 1. Seed Users
    console.log('Seeding Users...');
    let adminUser = await User.findOne({ role: UserRole.ADMIN });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin Srinu',
        email: 'admin@bhavyahomes.com',
        phone: '+91 94910 00000',
        password: '$2a$10$e842d731467cb74109c8d',
        role: UserRole.ADMIN,
        isActive: true,
      });
    }

    let customerUser = await User.findOne({ email: 'srikanth@gmail.com' });
    if (!customerUser) {
      customerUser = await User.create({
        name: 'Srikanth Rao',
        email: 'srikanth@gmail.com',
        phone: '+91 98765 12345',
        password: '$2a$10$e842d731467cb74109c8d',
        role: UserRole.CUSTOMER,
        isActive: true,
      });
    }

    let customerUser2 = await User.findOne({ email: 'kavitha@yahoo.com' });
    if (!customerUser2) {
      customerUser2 = await User.create({
        name: 'Kavitha Sharma',
        email: 'kavitha@yahoo.com',
        phone: '+91 98765 67890',
        password: '$2a$10$e842d731467cb74109c8d',
        role: UserRole.CUSTOMER,
        isActive: true,
      });
    }

    // 2. Seed Projects
    console.log('Seeding Master Projects & Ventures...');
    let project1 = await Project.findOne({ slug: 'bhavya-royal-county' });
    if (!project1) {
      project1 = await Project.create({
        name: 'Bhavya Royal County Gated Layout',
        slug: 'bhavya-royal-county',
        description: 'HMDA & RERA approved mega 50-acre gated luxury villa & plot community located at Kokapeta / Gachibowli corridor.',
        location: 'Kokapeta - Gachibowli Financial District',
        city: 'Hyderabad',
        state: 'Telangana',
        price: 18500000,
        projectType: ProjectType.GATED_COMMUNITY,
        status: ProjectStatus.ONGOING,
        amenities: ['100ft & 40ft Blacktop Roads', 'Underground Cabling', 'Luxury Clubhouse', 'Swimming Pool', '24/7 Security'],
        images: ['/hero-bg.jpg', '/villa1.jpg'],
        featured: true,
        isPublished: true,
        createdBy: adminUser._id,
      });
    }

    let project2 = await Project.findOne({ slug: 'bhavya-green-acres' });
    if (!project2) {
      project2 = await Project.create({
        name: 'Bhavya Green Acres Open Plot Layout',
        slug: 'bhavya-green-acres',
        description: 'Prime HMDA open plot layout near Shadnagar Regional Ring Road corridor with instant spot registration.',
        location: 'Shadnagar Corridor',
        city: 'Hyderabad',
        state: 'Telangana',
        price: 4800000,
        projectType: ProjectType.OPEN_PLOTS,
        status: ProjectStatus.ONGOING,
        amenities: ['Grand Entrance Archway', 'Children Play Park', 'Avenue Plantation', 'Compound Wall'],
        images: ['/plot1.jpg'],
        featured: true,
        isPublished: true,
        createdBy: adminUser._id,
      });
    }

    // 3. Seed Properties
    console.log('Seeding Properties & Listings...');
    const propertiesData = [
      {
        title: 'Bhavya Royal Luxury Villa',
        slug: 'bhavya-royal-luxury-villa-1',
        description: 'High-end 4BHK duplex luxury villa with modern interior design, private garden, and smart home automation.',
        propertyType: PropertyType.VILLA,
        price: 18500000,
        location: 'Gachibowli',
        address: 'Plot No 14, Bhavya Royal County, Gachibowli',
        city: 'Hyderabad',
        state: 'Telangana',
        area: 3800,
        areaUnit: AreaUnit.SQ_FT,
        bedrooms: 4,
        bathrooms: 4,
        amenities: ['Private Garden', 'Smart Home', '24/7 Power Backup', 'Covered Parking'],
        images: ['/villa1.jpg'],
        status: PropertyStatus.AVAILABLE,
        featured: true,
        isPublished: true,
        project: project1._id,
        createdBy: adminUser._id,
      },
      {
        title: 'Bhavya Green Acres Open Plot Layout',
        slug: 'bhavya-green-acres-open-plot-2',
        description: '200 Sq.Yds East facing HMDA & RERA approved premium open plot ready for construction.',
        propertyType: PropertyType.OPEN_PLOT,
        price: 4800000,
        location: 'Shadnagar Corridor',
        address: 'Plot No 88, Bhavya Green Acres, Shadnagar',
        city: 'Hyderabad',
        state: 'Telangana',
        area: 200,
        areaUnit: AreaUnit.SQ_YD,
        bedrooms: 0,
        bathrooms: 0,
        amenities: ['100ft Master Plan Road', 'Electricity Connection', 'Water Pipeline'],
        images: ['/plot1.jpg'],
        status: PropertyStatus.AVAILABLE,
        featured: true,
        isPublished: true,
        project: project2._id,
        createdBy: adminUser._id,
      },
      {
        title: 'Bhavya Aurora Sky Residences',
        slug: 'bhavya-aurora-sky-residences-3',
        description: 'Ultra-modern 3BHK high-rise apartment with panoramic skyline balcony views.',
        propertyType: PropertyType.APARTMENT,
        price: 9500000,
        location: 'Miyapur',
        address: 'Tower A - 12th Floor, Miyapur High Street',
        city: 'Hyderabad',
        state: 'Telangana',
        area: 1850,
        areaUnit: AreaUnit.SQ_FT,
        bedrooms: 3,
        bathrooms: 3,
        amenities: ['Clubhouse', 'Gymnasium', 'Rooftop Infinity Pool', 'EV Charging Station'],
        images: ['/apartment1.jpg'],
        status: PropertyStatus.AVAILABLE,
        featured: false,
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        title: 'Bhavya Grand Estate Villa',
        slug: 'bhavya-grand-estate-villa-4',
        description: 'Luxury 5BHK sprawling estate villa with private swimming pool and home theater setup.',
        propertyType: PropertyType.VILLA,
        price: 24500000,
        location: 'Jubilee Hills Extension',
        address: 'Road No 36 Extension, Jubilee Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        area: 4500,
        areaUnit: AreaUnit.SQ_FT,
        bedrooms: 5,
        bathrooms: 5,
        amenities: ['Private Pool', 'Home Theater', 'Solar Power System', 'Italian Marble Flooring'],
        images: ['/villa1.jpg'],
        status: PropertyStatus.SOLD,
        featured: true,
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        title: 'Bhavya Horizon Luxury Villa',
        slug: 'bhavya-horizon-luxury-villa-5',
        description: 'Contemporary 4BHK architectural masterpiece villa in Kokapeta luxury corridor.',
        propertyType: PropertyType.VILLA,
        price: 18500000,
        location: 'Kokapeta',
        address: 'Bhavya Horizon Gated Venture, Kokapeta',
        city: 'Hyderabad',
        state: 'Telangana',
        area: 3800,
        areaUnit: AreaUnit.SQ_FT,
        bedrooms: 4,
        bathrooms: 4,
        amenities: ['Double Height Living Area', 'Landscaped Terrace Garden'],
        images: ['/villa1.jpg'],
        status: PropertyStatus.AVAILABLE,
        featured: true,
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        title: 'Bhavya Heritage Executive Villa',
        slug: 'bhavya-heritage-executive-villa-6',
        description: 'Premium executive villa with dual car garage and Vastu compliant architecture.',
        propertyType: PropertyType.VILLA,
        price: 16500000,
        location: 'Kokapeta',
        address: 'Bhavya Heritage Layout, Kokapeta',
        city: 'Hyderabad',
        state: 'Telangana',
        area: 3800,
        areaUnit: AreaUnit.SQ_FT,
        bedrooms: 4,
        bathrooms: 4,
        amenities: ['100% Vastu Compliant', 'Underground Utilities'],
        images: ['/villa1.jpg'],
        status: PropertyStatus.AVAILABLE,
        featured: false,
        isPublished: true,
        createdBy: adminUser._id,
      },
    ];

    for (const propData of propertiesData) {
      const existing = await Property.findOne({ slug: propData.slug });
      if (!existing) {
        await Property.create(propData);
      }
    }

    // 4. Seed Inquiries
    console.log('Seeding Customer Inquiries...');
    const inquiriesData = [
      {
        customer: customerUser._id,
        name: 'Srikanth Rao',
        email: 'srikanth@gmail.com',
        phone: '+91 98765 12345',
        message: 'Interested in booking a site visit this weekend for Bhavya Royal Luxury Villa.',
        source: InquirySource.PROPERTY,
        status: InquiryStatus.NEW,
        adminNotes: 'Assigned to senior sales agent.',
      },
      {
        customer: customerUser2._id,
        name: 'Kavitha Sharma',
        email: 'kavitha@yahoo.com',
        phone: '+91 98765 67890',
        message: 'Looking for 200 sq yd open plot with bank loan support.',
        source: InquirySource.WEBSITE,
        status: InquiryStatus.CONTACTED,
        adminNotes: 'Sent layout brochure via WhatsApp.',
      },
      {
        name: 'Mahesh Kumar',
        email: 'mahesh@gmail.com',
        phone: '+91 98765 11223',
        message: 'Want to know floor plan & clubhouse amenities details for Bhavya Aurora Sky Residences.',
        source: InquirySource.CONTACT_FORM,
        status: InquiryStatus.IN_PROGRESS,
        adminNotes: 'Shared floor plan PDFs.',
      },
      {
        name: 'Anil Varma',
        email: 'anil@live.com',
        phone: '+91 98765 44332',
        message: 'Requesting final pricing quote and discount details.',
        source: InquirySource.PHONE,
        status: InquiryStatus.RESOLVED,
        adminNotes: 'Quote sent via email.',
      },
    ];

    for (const inqData of inquiriesData) {
      const existingInq = await Inquiry.findOne({ email: inqData.email, message: inqData.message });
      if (!existingInq) {
        await Inquiry.create(inqData);
      }
    }

    console.log('✅ ALL AVAILABLE DATA STORED & SEEDED SUCCESSFULLY IN MONGODB DATABASE!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();

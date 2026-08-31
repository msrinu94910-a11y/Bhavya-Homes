import mongoose from 'mongoose';
import { User, UserRole, UserStatus } from '../models/User.js';
import { Property, PropertyType, PropertyStatus, AreaUnit } from '../models/Property.js';
import { Project, ProjectType, ProjectStatus } from '../models/Project.js';
import { Inquiry, InquirySource, InquiryStatus } from '../models/Inquiry.js';
import { Lead } from '../models/Lead.js';
import { config } from '../config/environment.js';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB database...');
    await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected successfully to MongoDB Atlas cluster!');

    // 0. Clear stale test inquiries with dirty test messages
    console.log('Clearing old test inquiries...');
    await Inquiry.deleteMany({ message: { $regex: /b hvvg|test|asdf|qwerty/i } });
    await Lead.deleteMany({ notes: { $regex: /b hvvg|test|asdf|qwerty/i } });

    // 1. Seed Admin & Agents
    console.log('Seeding Admin & Agent Accounts...');
    let adminUser = await User.findOne({ role: UserRole.ADMIN });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin Srinu',
        email: 'admin@bhavyahomes.com',
        phone: '+91 94910 00000',
        password: '$2a$10$e842d731467cb74109c8d',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        isActive: true,
      });
    }

    const agentsData = [
      {
        name: 'Srenivasulu Reddy',
        email: 'srenivasulu@bhavyahomes.com',
        phone: '+91 89659 92274',
        agentCode: 'BH-AGT-101',
      },
      {
        name: 'Agent Janardhan Reddy',
        email: 'jana@gmail.com',
        phone: '+91 98765 99999',
        agentCode: 'BH-AGT-102',
      },
      {
        name: 'Priya Sharma',
        email: 'priya@bhavyahomes.com',
        phone: '+91 98765 77777',
        agentCode: 'BH-AGT-103',
      },
      {
        name: 'Rajesh Verma',
        email: 'rajesh@bhavyahomes.com',
        phone: '+91 98765 66666',
        agentCode: 'BH-AGT-104',
      },
      {
        name: 'Ananya Rao',
        email: 'ananya@bhavyahomes.com',
        phone: '+91 98765 55555',
        agentCode: 'BH-AGT-105',
      },
    ];

    const seededAgents: any[] = [];
    for (const agt of agentsData) {
      let agent = await User.findOne({ agentCode: agt.agentCode });
      if (!agent) {
        agent = await User.create({
          ...agt,
          password: '$2a$10$e842d731467cb74109c8d',
          role: UserRole.AGENT,
          status: UserStatus.ACTIVE,
          isActive: true,
        });
      } else {
        agent.name = agt.name;
        agent.phone = agt.phone;
        await agent.save();
      }
      seededAgents.push(agent);
    }

    const [agt1, agt2, agt3, agt4, agt5] = seededAgents;

    // 2. Seed Real Customer Users
    console.log('Seeding Real Customer Profiles...');
    const customersData = [
      { name: 'Srikanth Rao', email: 'srikanth@gmail.com', phone: '+91 98765 12345', agent: agt2 },
      { name: 'Kavitha Sharma', email: 'kavitha@yahoo.com', phone: '+91 98765 67890', agent: agt2 },
      { name: 'Mahesh Kumar', email: 'mahesh@gmail.com', phone: '+91 98765 11223', agent: agt1 },
      { name: 'Anil Varma', email: 'anil@live.com', phone: '+91 98765 44332', agent: agt1 },
      { name: 'Ramesh Babu', email: 'ramesh@gmail.com', phone: '+91 98765 55443', agent: agt3 },
      { name: 'Sunita Reddy', email: 'sunita@yahoo.com', phone: '+91 98765 66778', agent: agt4 },
      { name: 'Venkatesh Rao', email: 'venkat@gmail.com', phone: '+91 98765 77889', agent: agt5 },
      { name: 'Deepika Patel', email: 'deepika@outlook.com', phone: '+91 98765 88990', agent: agt3 },
      { name: 'Srinivas Varma', email: 'srinivas.v@gmail.com', phone: '+91 98765 99001', agent: agt4 },
      { name: 'Meenakshi Sundaram', email: 'meenakshi@gmail.com', phone: '+91 98765 11002', agent: agt1 },
    ];

    const seededCustomers: Record<string, any> = {};
    for (const cust of customersData) {
      let user = await User.findOne({ email: cust.email });
      if (!user) {
        user = await User.create({
          name: cust.name,
          email: cust.email,
          phone: cust.phone,
          password: '$2a$10$e842d731467cb74109c8d',
          role: UserRole.CUSTOMER,
          status: UserStatus.ACTIVE,
          isActive: true,
          assignedAgent: cust.agent._id,
          assignedAgentCode: cust.agent.agentCode,
          assignedAgentName: cust.agent.name,
          assignedAgentPhone: cust.agent.phone,
          assignedAgentStatus: cust.agent.status || 'ACTIVE',
          referredByAgent: cust.agent._id,
          leadSource: 'AGENT_REFERENCE',
        });
      } else {
        user.assignedAgent = cust.agent._id;
        user.assignedAgentCode = cust.agent.agentCode;
        user.assignedAgentName = cust.agent.name;
        user.assignedAgentPhone = cust.agent.phone;
        user.referredByAgent = cust.agent._id;
        user.leadSource = 'AGENT_REFERENCE';
        await user.save();
      }
      seededCustomers[cust.email] = user;
    }

    // 3. Seed Projects
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

    let project3 = await Project.findOne({ slug: 'bhavya-meenakshi-county' });
    if (!project3) {
      project3 = await Project.create({
        name: 'Bhavya Meenakshi County Mega Township',
        slug: 'bhavya-meenakshi-county',
        description: 'Upcoming 75-Acre mega luxury gated township at Tellapur / Kollur ORR Exit 2 with pre-launch pricing advantages.',
        location: 'Tellapur - Kollur ORR Corridor',
        city: 'Hyderabad',
        state: 'Telangana',
        price: 6500000,
        projectType: ProjectType.GATED_COMMUNITY,
        status: ProjectStatus.UPCOMING,
        amenities: ['25,000 Sq.Ft Clubhouse', 'Pre-Launch Offer', 'Crystal Lake View', 'Underground Cabling', 'Biometric Gate Access'],
        images: ['/hero-bg.jpg', '/plot1.jpg'],
        featured: true,
        isPublished: true,
        createdBy: adminUser._id,
      });
    }

    let project4 = await Project.findOne({ slug: 'bhavya-emerald-crest' });
    if (!project4) {
      project4 = await Project.create({
        name: 'Bhavya Emerald Crest Sky Residences',
        slug: 'bhavya-emerald-crest',
        description: 'Upcoming 38-Story high-rise luxury towers in Narsingi - Financial District offering 3 & 4 BHK sky villas.',
        location: 'Narsingi - Financial District',
        city: 'Hyderabad',
        state: 'Telangana',
        price: 12500000,
        projectType: ProjectType.APARTMENTS,
        status: ProjectStatus.UPCOMING,
        amenities: ['38-Story Sky Towers', 'Infinity Balconies', 'Sky Lounge', 'Multi-tier Security', 'EV Charging Bay'],
        images: ['/apartment1.jpg'],
        featured: true,
        isPublished: true,
        createdBy: adminUser._id,
      });
    } else {
      project4.images = ['/apartment1.jpg'];
      await project4.save();
    }

    let project5 = await Project.findOne({ slug: 'bhavya-serene-park' });
    if (!project5) {
      project5 = await Project.create({
        name: 'Bhavya Serene Park View Enclave',
        slug: 'bhavya-serene-park',
        description: 'Successfully completed and 100% occupied triplex villa township with active clubhouse and sports facilities.',
        location: 'Miyapur - Bachupally Highway',
        city: 'Hyderabad',
        state: 'Telangana',
        price: 18500000,
        projectType: ProjectType.VILLAS,
        status: ProjectStatus.COMPLETED,
        amenities: ['100% Occupied', 'Active Clubhouse', 'Solar Fencing', 'Landscaped Botanical Garden'],
        images: ['/villa1.jpg'],
        featured: true,
        isPublished: true,
        createdBy: adminUser._id,
      });
    }

    // 4. Seed Properties
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
    ];

    for (const propData of propertiesData) {
      const existing = await Property.findOne({ slug: propData.slug });
      if (!existing) {
        await Property.create(propData);
      }
    }

    // 5. Seed Real Customer Inquiries
    console.log('Seeding Brand-New Real Customer Inquiries...');
    const realInquiriesData = [
      {
        customer: seededCustomers['srikanth@gmail.com']._id,
        name: 'Srikanth Rao',
        email: 'srikanth@gmail.com',
        phone: '+91 98765 12345',
        message: 'Interested in booking a weekend site visit for 200 sq. yard East facing open plot in Kokapet venture.',
        source: InquirySource.PROPERTY,
        status: InquiryStatus.NEW,
        referredByAgent: agt2._id,
        assignedTo: agt2._id,
        agentCode: agt2.agentCode,
        agentName: agt2.name,
        agentPhone: agt2.phone,
        agentStatus: 'ACTIVE',
        adminNotes: 'Assigned to Agent Janardhan Reddy. Site visit scheduled for Sunday 10 AM.',
      },
      {
        customer: seededCustomers['kavitha@yahoo.com']._id,
        name: 'Kavitha Sharma',
        email: 'kavitha@yahoo.com',
        phone: '+91 98765 67890',
        message: 'Requesting HMDA approval document copy, RERA registration certificate, and home loan EMI breakdown.',
        source: InquirySource.WEBSITE,
        status: InquiryStatus.CONTACTED,
        referredByAgent: agt2._id,
        assignedTo: agt2._id,
        agentCode: agt2.agentCode,
        agentName: agt2.name,
        agentPhone: agt2.phone,
        agentStatus: 'ACTIVE',
        adminNotes: 'Shared brochure and loan eligibility calculation via WhatsApp.',
      },
      {
        customer: seededCustomers['mahesh@gmail.com']._id,
        name: 'Mahesh Kumar',
        email: 'mahesh@gmail.com',
        phone: '+91 98765 11223',
        message: 'Looking for 4 BHK triplex luxury villa in Gachibowli Financial District corridor with private garden.',
        source: InquirySource.CONTACT_FORM,
        status: InquiryStatus.IN_PROGRESS,
        referredByAgent: agt1._id,
        assignedTo: agt1._id,
        agentCode: agt1.agentCode,
        agentName: agt1.name,
        agentPhone: agt1.phone,
        agentStatus: 'ACTIVE',
        adminNotes: 'Assigned to Srenivasulu Reddy. Arranged virtual tour presentation.',
      },
      {
        customer: seededCustomers['anil@live.com']._id,
        name: 'Anil Varma',
        email: 'anil@live.com',
        phone: '+91 98765 44332',
        message: 'Requesting final pricing quote, spot registration details, and lump-sum payment discount terms.',
        source: InquirySource.PHONE,
        status: InquiryStatus.RESOLVED,
        referredByAgent: agt1._id,
        assignedTo: agt1._id,
        agentCode: agt1.agentCode,
        agentName: agt1.name,
        agentPhone: agt1.phone,
        agentStatus: 'ACTIVE',
        adminNotes: 'Pricing quote & discount sheet delivered via email.',
      },
      {
        customer: seededCustomers['ramesh@gmail.com']._id,
        name: 'Ramesh Babu',
        email: 'ramesh@gmail.com',
        phone: '+91 98765 55443',
        message: 'Interested in purchasing 2 adjacent open plots in Bhavya Green Acres layout for investment.',
        source: InquirySource.WEBSITE,
        status: InquiryStatus.NEW,
        referredByAgent: agt3._id,
        assignedTo: agt3._id,
        agentCode: agt3.agentCode,
        agentName: agt3.name,
        agentPhone: agt3.phone,
        agentStatus: 'ACTIVE',
        adminNotes: 'Assigned to Priya Sharma.',
      },
      {
        customer: seededCustomers['sunita@yahoo.com']._id,
        name: 'Sunita Reddy',
        email: 'sunita@yahoo.com',
        phone: '+91 98765 66778',
        message: 'Inquiring about Gated Villa possession timeline and clubhouse amenity completion dates.',
        source: InquirySource.PROPERTY,
        status: InquiryStatus.CONTACTED,
        referredByAgent: agt4._id,
        assignedTo: agt4._id,
        agentCode: agt4.agentCode,
        agentName: agt4.name,
        agentPhone: agt4.phone,
        agentStatus: 'ACTIVE',
        adminNotes: 'Assigned to Rajesh Verma. Possession confirmed for December 2026.',
      },
      {
        customer: seededCustomers['venkat@gmail.com']._id,
        name: 'Venkatesh Rao',
        email: 'venkat@gmail.com',
        phone: '+91 98765 77889',
        message: 'Want to book site visit cab pickup from Financial District office for Saturday 11 AM.',
        source: InquirySource.WHATSAPP,
        status: InquiryStatus.IN_PROGRESS,
        referredByAgent: agt5._id,
        assignedTo: agt5._id,
        agentCode: agt5.agentCode,
        agentName: agt5.name,
        agentPhone: agt5.phone,
        agentStatus: 'ACTIVE',
        adminNotes: 'Assigned to Ananya Rao. Cab pickup confirmed.',
      },
    ];

    for (const inqData of realInquiriesData) {
      await Inquiry.findOneAndUpdate(
        { email: inqData.email, message: inqData.message },
        inqData,
        { upsert: true, new: true }
      );
    }

    console.log('✅ BRAND-NEW REAL DATA SUCCESSFULLY STORED & SEEDED IN MONGODB ATLAS!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();

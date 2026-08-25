Project Overview

Build Bhavya Homes as a premium, modern, production-level real-estate web application.

The application should allow customers to:

Browse properties
Search properties
Filter properties
View property details
View projects
Submit inquiries
Save properties
Request site visits
Manage their profile

The application should allow administrators to:

Manage properties
Manage projects
Manage customers
Manage leads
Manage inquiries
Manage site visits
Manage website content
Manage media
Manage testimonials
Manage FAQs
View analytics
Manage application settings
2. Technology Stack
Frontend
Next.js
TypeScript
Tailwind CSS
Responsive UI
Backend
Node.js
Express.js
TypeScript
REST APIs
Database
MongoDB
Mongoose
Authentication
JWT
bcrypt
Media
Cloudinary
Architecture

Use a clean, modular, scalable architecture.

Phase 1 — Project Setup
Objective

Create the initial Bhavya Homes application structure.

Tasks
Create frontend application
Create backend application
Configure TypeScript
Configure Tailwind CSS
Configure MongoDB
Configure Mongoose
Configure environment variables
Configure Git
Configure API communication
Configure development scripts
Environment Variables

Create environment variables for:

MONGO_URI
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
NEXT_PUBLIC_API_URL

Never hardcode credentials.

Completion Criteria
Frontend runs successfully
Backend runs successfully
MongoDB connects successfully
No startup errors
Phase 2 — Application Architecture
Objective

Create a scalable project structure.

Frontend
frontend/
├── app/
├── components/
├── features/
├── hooks/
├── services/
├── lib/
├── types/
├── utils/
└── public/
Backend
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── validators/
├── utils/
└── server.ts
Architecture Rules
Controllers handle HTTP requests.
Services contain business logic.
Models handle database schemas.
Middleware handles authentication and validation.
Routes define API endpoints.
Validators validate incoming data.
Utilities contain reusable functions.
Phase 3 — Bhavya Homes UI/UX
Objective

Create a premium real-estate user interface.

Design Style

The design should be:

Premium
Luxury
Modern
Clean
Professional
Trustworthy
Responsive
Create Reusable Components
Navbar
Footer
Button
Input
Select
Modal
Property Card
Project Card
Testimonial Card
Search Bar
Filter Panel
Pagination
Loading State
Empty State
Error State
Confirmation Dialog
Responsive Support

The website must work on:

Desktop
Laptop
Tablet
Mobile
Phase 4 — Public Website
Objective

Build the complete customer-facing website.

Pages

Create:

Home
About
Properties
Property Details
Projects
Project Details
Services
Contact
FAQ
Privacy Policy
Terms & Conditions
Home Page

Create the following sections:

Hero
Bhavya Homes branding
Premium real-estate headline
Description
Property search
View Properties button
Contact button
Featured Properties

Display:

Property image
Property name
Location
Price
Property type
Status
View Details
Featured Projects

Display:

Project image
Project name
Location
Starting price
Project status
View Project
About Bhavya Homes

Include:

Company introduction
Mission
Vision
Why choose Bhavya Homes
Services

Display real-estate services.

Testimonials

Display customer testimonials.

Contact CTA

Provide a strong call-to-action for customers.

Phase 5 — Authentication
Objective

Implement secure authentication.

Customer Authentication

Implement:

Customer registration
Customer login
Logout
Forgot password
Reset password
Change password
Profile management
Admin Authentication

Admin should NOT have public registration.

Admin accounts must be created through a secure administrative process.

Security

Implement:

Password hashing
JWT authentication
Protected routes
Authentication middleware
Authorization middleware
Token validation
Phase 6 — Role-Based Access Control
Roles

The application should support:

ADMIN
CUSTOMER
Admin

Admin can access:

Admin dashboard
Properties
Projects
Customers
Leads
Inquiries
Site visits
CMS
Media
Testimonials
FAQs
Analytics
Settings
Customer

Customer can access:

Customer dashboard
Profile
Properties
Projects
Saved properties
Inquiries
Site visits
Notifications
Security Rule

A customer must never be able to access admin functionality or admin APIs.

Phase 7 — Property Management
Objective

Create complete property management.

Property Information

Each property should support:

Property name
Slug
Description
Property type
Price
Location
Address
City
State
Pincode
Area
Bedrooms
Bathrooms
Amenities
Images
Videos
Status
Featured
Created date
Updated date
Property Types

Support:

Apartment
Villa
Open Plot
Commercial Property
Independent House
Farm Land
Gated Community
Property Status

Support:

Available
Reserved
Sold
Under Construction
Upcoming
Admin CRUD

Admin can:

Create property
View property
Update property
Delete property
Publish property
Unpublish property
Mark featured
Remove featured
Phase 8 — Project Management
Objective

Allow admin to manage real-estate projects.

Project Information

Support:

Project name
Slug
Description
Location
Price
Project type
Status
Amenities
Specifications
Images
Videos
Gallery
Map location
Featured
Created date
Updated date
Admin Actions
Create project
View project
Update project
Delete project
Publish project
Unpublish project
Feature project
Phase 9 — Property Search and Filters
Objective

Allow customers to easily find properties.

Search

Search by:

Property name
Location
Project
Keyword
Filters

Filter by:

Property type
Location
Price range
Bedrooms
Area
Status
Project
Sorting

Provide:

Newest
Price low to high
Price high to low
Featured
Performance

Use:

Pagination
Database indexes
Optimized MongoDB queries

Do not fetch all properties unnecessarily.

Phase 10 — Customer Dashboard
Objective

Create a separate customer dashboard.

Dashboard Overview

Display:

Customer name
Profile
Saved properties
Recent inquiries
Upcoming site visits
Notifications
Customer Pages
Customer Dashboard
├── Overview
├── Profile
├── Saved Properties
├── My Inquiries
├── Site Visits
├── Notifications
└── Settings
Features

Customer can:

Update profile
Change password
Save properties
Remove saved properties
Send property inquiries
View inquiry status
Request site visits
View site visit status
Phase 11 — Leads and Inquiries
Objective

Create a complete lead management system.

Lead Information

Store:

Customer
Name
Email
Phone
Property
Project
Message
Source
Status
Assigned admin
Notes
Created date
Updated date
Lead Sources

Support:

Website
Property inquiry
Contact form
Phone
WhatsApp
Site visit
Lead Status
NEW
CONTACTED
INTERESTED
FOLLOW_UP
SITE_VISIT
NEGOTIATION
CONVERTED
NOT_INTERESTED
CLOSED
Admin Features

Admin can:

View leads
Search leads
Filter leads
Assign leads
Update lead status
Add notes
View lead details
Phase 12 — Site Visit Management
Objective

Allow customers to request property site visits.

Customer

Customer can:

Select property
Select date
Select time
Submit site visit request
Admin

Admin can:

View request
Confirm request
Reschedule
Cancel
Mark completed
Status
REQUESTED
CONFIRMED
RESCHEDULED
COMPLETED
CANCELLED
Phase 13 — Admin Dashboard
Objective

Create a complete admin dashboard.

Dashboard Statistics

Display:

Total Properties
Available Properties
Sold Properties
Total Projects
Total Customers
Total Leads
New Inquiries
Site Visits
Converted Leads
Admin Navigation
Dashboard
Properties
Projects
Customers
Leads
Inquiries
Site Visits
Testimonials
FAQs
CMS
Media
Analytics
Notifications
Settings
Logout
Admin Dashboard Requirements
Responsive
Secure
Fast
Clean
Easy to use
Production-ready
Phase 14 — CMS
Objective

Allow admin to manage website content.

CMS Management

Admin can manage:

Homepage content
About page
Services
FAQs
Testimonials
Banners
Contact information
Social links
SEO metadata

Content that should be managed by admin must not be unnecessarily hardcoded.

Phase 15 — Media Management
Objective

Implement media management using Cloudinary.

Features
Upload images
Upload videos
Delete media
Replace media
Multiple image upload
Image optimization
Image validation
Media Usage

Media can be used for:

Properties
Projects
Homepage banners
Gallery
Testimonials
CMS content
Security

Validate:

File type
File size
User permissions
Phase 16 — Notifications
Objective

Implement application notifications.

Customer Notifications

Notify customers when:

Inquiry is submitted
Inquiry status changes
Site visit is confirmed
Site visit is rescheduled
Site visit is cancelled
Admin Notifications

Notify admins when:

New customer registers
New inquiry arrives
New lead is created
New site visit request arrives
New contact request arrives
Phase 17 — Analytics Dashboard
Objective

Provide useful real-estate business analytics.

Track
Property views
Project views
Customer registrations
Leads
Inquiries
Site visits
Converted leads
Search activity
Dashboard

Display appropriate:

Statistics cards
Charts
Tables
Trends
Reports

Create:

Property report
Customer report
Lead report
Inquiry report
Site visit report
Conversion report
Phase 18 — SEO
Objective

Optimize Bhavya Homes for search engines.

Implement:

SEO titles
Meta descriptions
Open Graph metadata
Canonical URLs
Sitemap
Robots.txt
Structured data
Image alt text
Property SEO
Location SEO
Property URLs

Use SEO-friendly URLs.

Example:

/properties/luxury-villa-hyderabad
Phase 19 — Security
Objective

Make the application secure for production.

Implement:

JWT authentication
bcrypt password hashing
RBAC
Input validation
API authorization
Rate limiting
CORS
Security headers
Secure environment variables
File upload validation
MongoDB security
Centralized error handling

Never expose:

Passwords
JWT secrets
Database credentials
Cloudinary secrets
Internal production stack traces
Phase 20 — Testing
Objective

Test every important feature.

Backend

Test:

Authentication
Authorization
Property CRUD
Project CRUD
Customer APIs
Lead APIs
Inquiry APIs
Site visit APIs
Media APIs
Frontend

Test:

Registration
Login
Logout
Property search
Filters
Property details
Customer dashboard
Admin dashboard
Forms
Responsive layouts
Devices

Test on:

Desktop
Laptop
Tablet
Android
iPhone
Phase 21 — Performance Optimization
Objective

Improve application performance.

Implement:

Image optimization
Lazy loading
Pagination
Database indexing
API optimization
Code splitting
Efficient MongoDB queries
Cloudinary optimization
Reduced unnecessary API requests
Caching where appropriate
Phase 22 — Production Deployment
Objective

Deploy Bhavya Homes to production.

Frontend

Configure:

Production environment
Domain
SSL
API URL
Production build
Backend

Configure:

Production server
MongoDB
Environment variables
Cloudinary
CORS
Logging
Error handling
Production Testing

Verify:

Home
Properties
Projects
Authentication
Customer dashboard
Admin dashboard
Leads
Inquiries
Site visits
CMS
Media
Notifications
Analytics
SEO
Phase 23 — Monitoring and Maintenance
Objective

Maintain the application after deployment.

Monitor:

Server errors
API errors
Database errors
Application performance
Security events

Perform:

Bug fixes
Dependency updates
Database backups
Security updates
Performance improvements
Feature improvements
Antigravity Execution Rules

Antigravity must follow these rules while developing Bhavya Homes.

Rule 1 — Work Phase by Phase

Do not implement all features at once.

Follow:

Phase 1
↓
Phase 2
↓
Phase 3
↓
Phase 4
↓
...
↓
Phase 23
Rule 2 — Verify Every Phase

After completing each phase:

Run the application.
Check for errors.
Test the implemented functionality.
Fix errors.
Verify existing functionality.
Only then continue.
Rule 3 — Do Not Break Existing Code

When adding a new feature:

Reuse existing components.
Reuse existing services.
Reuse existing API patterns.
Do not unnecessarily rewrite working code.
Do not delete working functionality without a requirement.
Rule 4 — Code Quality

Use:

TypeScript
Reusable components
Modular architecture
Clean code
Proper naming
Proper error handling
Proper validation

Avoid:

Duplicate code
Hardcoded secrets
Unused imports
Unused files
Temporary hacks
Unnecessary dependencies
Rule 5 — API Standards

Use consistent API responses.

Example:

{
  "success": true,
  "message": "Property fetched successfully",
  "data": {}
}

Error example:

{
  "success": false,
  "message": "Property not found",
  "data": null
}

Use appropriate HTTP status codes.

Rule 6 — Database Standards

Use:

Mongoose schemas
Validation
Indexes
Pagination
Efficient queries
Proper references

Do not make unnecessary database queries.

Rule 7 — Authentication Flow

Protected functionality must follow:

Request
   ↓
Authentication
   ↓
JWT Validation
   ↓
User Identification
   ↓
Role Verification
   ↓
Permission Verification
   ↓
Controller
   ↓
Service
   ↓
Database
Rule 8 — UI Standards

Every important page should have:

Loading state
Empty state
Error state
Success feedback
Responsive layout

Use the same Bhavya Homes design system throughout the application.

Final Definition of Done

Bhavya Homes is complete only when all of the following are working:

Project setup

Application architecture

Premium UI/UX

Public website

Customer authentication

Admin authentication

RBAC

Property management

Project management

Search

Filters

Customer dashboard

Lead management

Inquiry management

Site visit management

Admin dashboard

CMS

Media management

Notifications

Analytics

SEO

Security

Testing

Performance optimization

Production deployment

Monitoring

Final Antigravity Instruction

Build Bhavya Homes according to this phases.md.

Do not skip phases.

Do not assume a phase is complete without testing it.

Do not move to the next phase if the current phase has critical errors.

Maintain the existing functionality while implementing new features.

The final application must be:

Premium + Modern + Responsive + Secure + Scalable + SEO-Friendly + Fast + Production-Ready.
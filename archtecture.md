Overview

Bhavya Homes is a production-level real-estate web application designed to provide customers with an easy way to discover properties and projects, submit inquiries, save properties, and request site visits.

Administrators can manage the complete real-estate business through a secure admin dashboard.

The architecture should be:

Scalable
Secure
Modular
Maintainable
Responsive
Production-ready
SEO-friendly
Performance optimized
2. Technology Stack
Frontend
Next.js
TypeScript
Tailwind CSS
Backend
Node.js
Express.js
TypeScript
Database
MongoDB
Mongoose
Authentication
JWT
bcrypt
Media Management
Cloudinary
API
REST API
3. High-Level Architecture
                         BHAVYA HOMES
                              │
                              ▼
                       ┌──────────────┐
                       │    Client    │
                       │ Web Browser  │
                       └──────┬───────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │    Next.js      │
                     │    Frontend     │
                     └────────┬────────┘
                              │
                         REST API
                              │
                              ▼
                     ┌─────────────────┐
                     │    Express.js   │
                     │     Backend     │
                     └────────┬────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
          ┌──────────┐  ┌───────────┐  ┌────────────┐
          │ MongoDB  │  │ Cloudinary│  │   Auth     │
          │ Database │  │   Media   │  │ JWT/bcrypt │
          └──────────┘  └───────────┘  └────────────┘
4. Application Layers

The application follows a layered architecture.

Presentation Layer
        ↓
API Layer
        ↓
Controller Layer
        ↓
Service Layer
        ↓
Data Access Layer
        ↓
MongoDB

Each layer should have a clear responsibility.

5. Frontend Architecture
Frontend Responsibilities

The frontend is responsible for:

UI rendering
User interaction
Form handling
Client-side validation
API communication
Authentication state
Dashboard rendering
Responsive design
6. Frontend Folder Structure

Use the following structure:

frontend/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── about/
│   ├── properties/
│   ├── projects/
│   ├── services/
│   ├── contact/
│   ├── faq/
│   │
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   │
│   ├── dashboard/
│   │   ├── customer/
│   │   └── admin/
│   │
│   └── api/
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── property/
│   ├── project/
│   ├── forms/
│   └── dashboard/
│
├── features/
│   ├── auth/
│   ├── properties/
│   ├── projects/
│   ├── customers/
│   ├── leads/
│   ├── inquiries/
│   ├── site-visits/
│   ├── notifications/
│   └── analytics/
│
├── services/
│   ├── auth.service.ts
│   ├── property.service.ts
│   ├── project.service.ts
│   ├── lead.service.ts
│   ├── inquiry.service.ts
│   └── siteVisit.service.ts
│
├── hooks/
├── lib/
├── types/
├── utils/
├── public/
└── styles/
7. Next.js Routing Architecture

Use Next.js App Router.

Public Routes
/
├── /about
├── /properties
├── /properties/[slug]
├── /projects
├── /projects/[slug]
├── /services
├── /contact
├── /faq
├── /privacy-policy
└── /terms
Authentication Routes
/auth/login
/auth/register
/auth/forgot-password
/auth/reset-password
Customer Routes
/dashboard/customer
/dashboard/customer/profile
/dashboard/customer/saved-properties
/dashboard/customer/inquiries
/dashboard/customer/site-visits
/dashboard/customer/notifications
/dashboard/customer/settings
Admin Routes
/dashboard/admin
/dashboard/admin/properties
/dashboard/admin/projects
/dashboard/admin/customers
/dashboard/admin/leads
/dashboard/admin/inquiries
/dashboard/admin/site-visits
/dashboard/admin/testimonials
/dashboard/admin/faqs
/dashboard/admin/cms
/dashboard/admin/media
/dashboard/admin/analytics
/dashboard/admin/notifications
/dashboard/admin/settings
8. Backend Architecture

The backend follows:

Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Model
   ↓
MongoDB
9. Backend Folder Structure
backend/
│
├── config/
│   ├── database.ts
│   ├── cloudinary.ts
│   └── environment.ts
│
├── controllers/
│   ├── auth.controller.ts
│   ├── property.controller.ts
│   ├── project.controller.ts
│   ├── customer.controller.ts
│   ├── lead.controller.ts
│   ├── inquiry.controller.ts
│   ├── siteVisit.controller.ts
│   ├── notification.controller.ts
│   ├── cms.controller.ts
│   └── analytics.controller.ts
│
├── middleware/
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   ├── error.middleware.ts
│   ├── validation.middleware.ts
│   ├── upload.middleware.ts
│   └── rateLimit.middleware.ts
│
├── models/
│   ├── User.ts
│   ├── Property.ts
│   ├── Project.ts
│   ├── Lead.ts
│   ├── Inquiry.ts
│   ├── SiteVisit.ts
│   ├── Notification.ts
│   ├── Testimonial.ts
│   ├── FAQ.ts
│   └── CMS.ts
│
├── routes/
│   ├── auth.routes.ts
│   ├── property.routes.ts
│   ├── project.routes.ts
│   ├── customer.routes.ts
│   ├── lead.routes.ts
│   ├── inquiry.routes.ts
│   ├── siteVisit.routes.ts
│   ├── notification.routes.ts
│   ├── cms.routes.ts
│   └── analytics.routes.ts
│
├── services/
│   ├── auth.service.ts
│   ├── property.service.ts
│   ├── project.service.ts
│   ├── lead.service.ts
│   ├── inquiry.service.ts
│   ├── siteVisit.service.ts
│   ├── notification.service.ts
│   ├── media.service.ts
│   └── analytics.service.ts
│
├── validators/
│   ├── auth.validator.ts
│   ├── property.validator.ts
│   ├── project.validator.ts
│   ├── inquiry.validator.ts
│   └── siteVisit.validator.ts
│
├── utils/
│   ├── jwt.ts
│   ├── password.ts
│   ├── response.ts
│   ├── pagination.ts
│   └── logger.ts
│
├── app.ts
└── server.ts
10. Database Architecture

Use MongoDB as the primary database.

Main Collections
users
properties
projects
leads
inquiries
sitevisits
notifications
testimonials
faqs
cms
11. User Model

The User collection stores customers and admins.

Example structure:

User
├── name
├── email
├── phone
├── password
├── role
├── profileImage
├── isActive
├── createdAt
└── updatedAt
Roles
ADMIN
CUSTOMER

Admin registration must not be publicly available.

12. Property Model
Property
├── title
├── slug
├── description
├── propertyType
├── price
├── location
├── address
├── city
├── state
├── pincode
├── area
├── bedrooms
├── bathrooms
├── amenities
├── images
├── videos
├── status
├── featured
├── project
├── createdAt
└── updatedAt
13. Project Model
Project
├── name
├── slug
├── description
├── location
├── price
├── projectType
├── status
├── amenities
├── specifications
├── images
├── videos
├── gallery
├── mapLocation
├── featured
├── createdAt
└── updatedAt
14. Lead Model
Lead
├── customer
├── name
├── email
├── phone
├── property
├── project
├── source
├── status
├── assignedTo
├── notes
├── createdAt
└── updatedAt
15. Inquiry Model
Inquiry
├── customer
├── property
├── project
├── name
├── email
├── phone
├── message
├── status
├── createdAt
└── updatedAt
16. Site Visit Model
SiteVisit
├── customer
├── property
├── date
├── time
├── status
├── adminNotes
├── createdAt
└── updatedAt
17. Notification Model
Notification
├── user
├── title
├── message
├── type
├── isRead
├── createdAt
└── updatedAt
18. Authentication Architecture

Authentication flow:

Customer
    ↓
Login
    ↓
Backend
    ↓
Validate Credentials
    ↓
bcrypt Password Verification
    ↓
Generate JWT
    ↓
Return Authentication Token
    ↓
Frontend
    ↓
Protected Requests

For every protected request:

Request
   ↓
JWT
   ↓
Auth Middleware
   ↓
Decode Token
   ↓
Find User
   ↓
Check Role
   ↓
Allow / Reject
19. Authorization Architecture

Use Role-Based Access Control.

Admin
ADMIN
 ├── Properties
 ├── Projects
 ├── Customers
 ├── Leads
 ├── Inquiries
 ├── Site Visits
 ├── CMS
 ├── Media
 ├── Analytics
 └── Settings
Customer
CUSTOMER
 ├── Properties
 ├── Projects
 ├── Profile
 ├── Saved Properties
 ├── Inquiries
 ├── Site Visits
 └── Notifications
20. API Architecture

Use REST APIs.

Base URL:

/api
Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/me
Properties
GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PUT    /api/properties/:id
DELETE /api/properties/:id
Projects
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
Leads
GET   /api/leads
GET   /api/leads/:id
POST  /api/leads
PUT   /api/leads/:id
Inquiries
GET   /api/inquiries
GET   /api/inquiries/:id
POST  /api/inquiries
PUT   /api/inquiries/:id
Site Visits
GET   /api/site-visits
GET   /api/site-visits/:id
POST  /api/site-visits
PUT   /api/site-visits/:id
DELETE /api/site-visits/:id
21. API Response Architecture

Use a consistent response format.

Success
{
  "success": true,
  "message": "Property fetched successfully",
  "data": {}
}
Error
{
  "success": false,
  "message": "Property not found",
  "data": null
}
Pagination
{
  "success": true,
  "message": "Properties fetched successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
22. Property Search Architecture

Customer request:

Search / Filter
      ↓
Next.js
      ↓
Property API
      ↓
Controller
      ↓
Property Service
      ↓
MongoDB Query
      ↓
Filtered Properties
      ↓
Frontend

Use query parameters.

Example:

/api/properties?city=Hyderabad&type=villa&minPrice=5000000&maxPrice=15000000

Use database indexes for commonly searched fields.

23. Media Architecture

Use Cloudinary for image and video storage.

Admin
  ↓
Upload
  ↓
Backend
  ↓
Validation
  ↓
Cloudinary
  ↓
Cloudinary URL
  ↓
MongoDB

Store media URLs and required metadata in MongoDB.

Do not store large media files directly inside MongoDB.

24. Admin Architecture

Admin flow:

Admin Login
     ↓
JWT Authentication
     ↓
Admin Authorization
     ↓
Admin Dashboard
     ↓
Management Modules

Admin modules:

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
25. Customer Architecture

Customer flow:

Register/Login
      ↓
Customer Dashboard
      ↓
Browse Properties
      ↓
View Property
      ↓
Save / Inquiry / Site Visit
      ↓
Track Status
26. Lead Management Architecture
Customer
   ↓
Inquiry
   ↓
Lead Created
   ↓
Admin Dashboard
   ↓
Assign Lead
   ↓
Contact Customer
   ↓
Update Status
   ↓
Follow-up
   ↓
Site Visit
   ↓
Negotiation
   ↓
Converted
27. Error Handling Architecture

Use centralized error handling.

Request
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Error
   ↓
Error Middleware
   ↓
Standard API Response

Do not expose internal errors in production.

Example:

{
  "success": false,
  "message": "Something went wrong",
  "data": null
}
28. Validation Architecture

Validate all user input.

Validation should happen before business logic.

Validate:

Email
Phone
Password
Property data
Project data
Price
Dates
File uploads
IDs
Query parameters

Never trust frontend validation alone.

Backend validation is mandatory.

29. Security Architecture

Implement:

JWT authentication
bcrypt
RBAC
Rate limiting
CORS
Security headers
Input validation
File validation
Secure environment variables
MongoDB security
Proper HTTP status codes

Never expose:

Database credentials
JWT secret
Cloudinary secret
Passwords
Internal stack traces
30. Performance Architecture

Optimize:

Next.js pages
Images
API requests
MongoDB queries
Database indexes
Cloudinary assets

Use:

Lazy loading
Pagination
Image optimization
Code splitting
Caching where appropriate
Efficient database queries
31. SEO Architecture

Each important public page should have proper SEO metadata.

Property Page

Example:

Title:
Luxury Villa in Hyderabad | Bhavya Homes

Description:
Discover premium luxury villas in Hyderabad with Bhavya Homes.

Use:

Metadata
Sitemap
Robots.txt
Structured data
Canonical URLs
Open Graph
Alt text
32. Deployment Architecture

Production architecture:

                 Internet
                    │
                    ▼
             ┌─────────────┐
             │   Domain    │
             └──────┬──────┘
                    │
                    ▼
             ┌─────────────┐
             │   Next.js   │
             │  Frontend   │
             └──────┬──────┘
                    │
                  HTTPS
                    │
                    ▼
             ┌─────────────┐
             │  Express    │
             │   Backend   │
             └──────┬──────┘
                    │
            ┌───────┴────────┐
            │                │
            ▼                ▼
       ┌─────────┐      ┌───────────┐
       │ MongoDB │      │ Cloudinary│
       └─────────┘      └───────────┘
33. Environment Architecture

Use separate environments:

Development
     ↓
Testing
     ↓
Production

Never use production credentials during local development.

34. Development Workflow

Antigravity must follow:

Requirement
     ↓
Architecture
     ↓
Implementation
     ↓
Testing
     ↓
Bug Fixing
     ↓
Code Review
     ↓
Next Feature
35. Git Workflow

Use Git for version control.

Recommended branches:

main
develop
feature/*
bugfix/*

Example:

feature/property-management
feature/customer-dashboard
feature/admin-dashboard
bugfix/login-error

Do not commit:

.env
node_modules/
build/
.next/
36. Architecture Principles

The application must follow these principles:

Separation of Concerns

Each module should have one clear responsibility.

Reusability

Create reusable components and services.

Scalability

The architecture should allow new features without major restructuring.

Security

All protected operations must be authenticated and authorized.

Maintainability

Code should be easy for another developer to understand.

Performance

Avoid unnecessary database and API operations.

Consistency

Use consistent naming, API responses, UI patterns, and folder structure.

37. Final Architecture
                           BHAVYA HOMES
                                │
                                ▼
                       ┌─────────────────┐
                       │    Next.js      │
                       │    Frontend     │
                       └────────┬────────┘
                                │
                              HTTPS
                                │
                                ▼
                       ┌─────────────────┐
                       │ Express Backend │
                       └────────┬────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
   ┌─────────────┐       ┌─────────────┐      ┌─────────────┐
   │    Auth     │       │   Services  │      │ Middleware  │
   │ JWT/bcrypt  │       │ Business    │      │ RBAC/Auth   │
   └─────────────┘       │   Logic     │      └─────────────┘
                         └──────┬──────┘
                                │
                                ▼
                         ┌─────────────┐
                         │   Mongoose  │
                         └──────┬──────┘
                                │
                                ▼
                         ┌─────────────┐
                         │   MongoDB   │
                         └─────────────┘

                                │
                                ▼
                         ┌─────────────┐
                         │  Cloudinary │
                         │ Images/Video│
                         └─────────────┘
38. Final Antigravity Instruction

Use this architecture.md as the technical architecture reference for Bhavya Homes.

Before implementing a feature, check whether it follows this architecture.

Do not introduce unnecessary technologies.

Do not create duplicate architecture patterns.

Do not bypass authentication or authorization.

Do not put business logic directly inside frontend components or route handlers.

Keep the application modular and production-ready.

The final Bhavya Homes system must be:

Secure + Scalable + Modular + Maintainable + Responsive + SEO-Friendly + Performance Optimized + Production-Ready.
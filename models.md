Overview

This document defines the database models for the Bhavya Homes real-estate web application.

The application uses:

MongoDB
Mongoose
TypeScript

All models must be:

Modular
Validated
Secure
Scalable
Production-ready
Properly indexed
2. Database Architecture

The main MongoDB collections are:

users
properties
projects
inquiries
leads
siteVisits
savedProperties
notifications
testimonials
faqs
cmsContents
media
contactMessages
Relationships
User
 │
 ├──────────────► SavedProperty
 │
 ├──────────────► Inquiry
 │
 ├──────────────► Lead
 │
 ├──────────────► SiteVisit
 │
 └──────────────► Notification

Project
 │
 └──────────────► Property

Property
 ├──────────────► Inquiry
 ├──────────────► Lead
 ├──────────────► SiteVisit
 └──────────────► SavedProperty
3. User Model
Purpose

Stores both customers and administrators.

Collection
users
Fields
Field	Type	Required	Description
name	String	Yes	User full name
email	String	Yes	Unique email
phone	String	Yes	Phone number
password	String	Yes	Hashed password
role	Enum	Yes	ADMIN or CUSTOMER
profileImage	String	No	Profile image URL
isActive	Boolean	Yes	Account status
lastLoginAt	Date	No	Last login
createdAt	Date	Auto	Created time
updatedAt	Date	Auto	Updated time
Role
ADMIN
CUSTOMER
Rules
Email must be unique.
Password must always be hashed.
Password must never be returned in API responses.
Admin registration must not be public.
Only authorized administrators can create admin accounts.
Indexes
email: unique
role
isActive
4. Property Model
Purpose

Stores individual real-estate properties.

Collection
properties
Fields
Field	Type	Required	Description
title	String	Yes	Property name
slug	String	Yes	SEO-friendly URL
description	String	Yes	Property description
propertyType	Enum	Yes	Property category
price	Number	Yes	Property price
location	String	Yes	Property location
address	String	Yes	Full address
city	String	Yes	City
state	String	Yes	State
pincode	String	No	Pincode
area	Number	Yes	Property area
areaUnit	Enum	Yes	Sq.ft, Sq.yd, Acre etc.
bedrooms	Number	No	Number of bedrooms
bathrooms	Number	No	Number of bathrooms
amenities	Array	No	Property amenities
images	Array	No	Property images
videos	Array	No	Property videos
project	ObjectId	No	Related project
status	Enum	Yes	Property status
featured	Boolean	Yes	Featured property
isPublished	Boolean	Yes	Published status
createdBy	ObjectId	Yes	Admin who created it
createdAt	Date	Auto	Created time
updatedAt	Date	Auto	Updated time
Property Types
APARTMENT
VILLA
OPEN_PLOT
COMMERCIAL
INDEPENDENT_HOUSE
FARM_LAND
GATED_COMMUNITY
Property Status
AVAILABLE
RESERVED
SOLD
UNDER_CONSTRUCTION
UPCOMING
Indexes
slug: unique
city
propertyType
price
status
featured
project
createdAt
5. Project Model
Purpose

Stores large real-estate projects.

Collection
projects
Fields
Field	Type	Required	Description
name	String	Yes	Project name
slug	String	Yes	SEO-friendly URL
description	String	Yes	Project description
location	String	Yes	Project location
address	String	No	Project address
city	String	Yes	City
state	String	Yes	State
pincode	String	No	Pincode
price	Number	No	Starting price
projectType	Enum	Yes	Project category
status	Enum	Yes	Project status
amenities	Array	No	Project amenities
specifications	Array	No	Project specifications
images	Array	No	Project images
videos	Array	No	Project videos
gallery	Array	No	Gallery images
mapLocation	Object	No	Latitude/longitude
featured	Boolean	Yes	Featured project
isPublished	Boolean	Yes	Published status
createdBy	ObjectId	Yes	Admin
createdAt	Date	Auto	Created time
updatedAt	Date	Auto	Updated time
Project Types
RESIDENTIAL
COMMERCIAL
VILLAS
APARTMENTS
OPEN_PLOTS
GATED_COMMUNITY
Project Status
UPCOMING
ONGOING
COMPLETED
SOLD_OUT
Indexes
slug: unique
city
projectType
status
featured
createdAt
6. Saved Property Model
Purpose

Stores properties saved/favorited by customers.

Collection
savedProperties
Fields
Field	Type	Required
user	ObjectId	Yes
property	ObjectId	Yes
createdAt	Date	Auto
Rules

A customer cannot save the same property twice.

Compound Index
user + property: unique
7. Inquiry Model
Purpose

Stores customer inquiries about properties or projects.

Collection
inquiries
Fields
Field	Type	Required
customer	ObjectId	No
property	ObjectId	No
project	ObjectId	No
name	String	Yes
email	String	Yes
phone	String	Yes
message	String	Yes
source	Enum	Yes
status	Enum	Yes
assignedTo	ObjectId	No
adminNotes	String	No
createdAt	Date	Auto
updatedAt	Date	Auto
Inquiry Sources
PROPERTY
PROJECT
CONTACT_FORM
WEBSITE
PHONE
WHATSAPP
Inquiry Status
NEW
CONTACTED
IN_PROGRESS
RESOLVED
CLOSED
Indexes
customer
property
project
status
createdAt
8. Lead Model
Purpose

Stores and tracks potential customers.

Collection
leads
Fields
Field	Type	Required
customer	ObjectId	No
name	String	Yes
email	String	Yes
phone	String	Yes
property	ObjectId	No
project	ObjectId	No
source	Enum	Yes
status	Enum	Yes
assignedTo	ObjectId	No
notes	String	No
nextFollowUpAt	Date	No
createdAt	Date	Auto
updatedAt	Date	Auto
Lead Sources
WEBSITE
PROPERTY_INQUIRY
PROJECT_INQUIRY
CONTACT_FORM
PHONE
WHATSAPP
SITE_VISIT
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
Indexes
status
source
assignedTo
createdAt
phone
email
9. Site Visit Model
Purpose

Stores customer property visit requests.

Collection
siteVisits
Fields
Field	Type	Required
customer	ObjectId	Yes
property	ObjectId	Yes
requestedDate	Date	Yes
requestedTime	String	Yes
confirmedDate	Date	No
confirmedTime	String	No
status	Enum	Yes
adminNotes	String	No
createdAt	Date	Auto
updatedAt	Date	Auto
Site Visit Status
REQUESTED
CONFIRMED
RESCHEDULED
COMPLETED
CANCELLED
Indexes
customer
property
status
requestedDate
10. Notification Model
Purpose

Stores user notifications.

Collection
notifications
Fields
Field	Type	Required
user	ObjectId	Yes
title	String	Yes
message	String	Yes
type	Enum	Yes
referenceId	ObjectId	No
isRead	Boolean	Yes
createdAt	Date	Auto
Notification Types
INQUIRY
LEAD
SITE_VISIT
PROPERTY
SYSTEM
Indexes
user
isRead
createdAt
11. Testimonial Model
Purpose

Stores customer testimonials displayed on the website.

Collection
testimonials
Fields
Field	Type	Required
customerName	String	Yes
customerImage	String	No
rating	Number	Yes
message	String	Yes
isPublished	Boolean	Yes
createdAt	Date	Auto
updatedAt	Date	Auto
Rating

Allowed:

1 - 5
12. FAQ Model
Purpose

Stores frequently asked questions.

Collection
faqs
Fields
Field	Type	Required
question	String	Yes
answer	String	Yes
category	String	No
order	Number	Yes
isPublished	Boolean	Yes
createdAt	Date	Auto
updatedAt	Date	Auto
Indexes
category
order
isPublished
13. CMS Content Model
Purpose

Stores website content managed by administrators.

Collection
cmsContents
Fields
Field	Type	Required
key	String	Yes
title	String	No
content	String	No
image	String	No
metadata	Object	No
isPublished	Boolean	Yes
updatedBy	ObjectId	Yes
createdAt	Date	Auto
updatedAt	Date	Auto
Example Keys
HOME_HERO
HOME_ABOUT
HOME_SERVICES
HOME_CTA
ABOUT_PAGE
CONTACT_PAGE
Index
key: unique
14. Media Model
Purpose

Stores information about uploaded images and videos.

Collection
media
Fields
Field	Type	Required
url	String	Yes
publicId	String	Yes
resourceType	Enum	Yes
format	String	No
width	Number	No
height	Number	No
size	Number	No
folder	String	No
uploadedBy	ObjectId	Yes
createdAt	Date	Auto
Resource Types
IMAGE
VIDEO
Cloudinary

Actual files should be stored in Cloudinary.

MongoDB should store the Cloudinary metadata and URLs.

15. Contact Message Model
Purpose

Stores messages submitted through the Contact Us page.

Collection
contactMessages
Fields
Field	Type	Required
name	String	Yes
email	String	Yes
phone	String	No
subject	String	No
message	String	Yes
status	Enum	Yes
createdAt	Date	Auto
updatedAt	Date	Auto
Status
NEW
READ
RESPONDED
CLOSED
16. Relationships
User → Saved Properties
User
  │
  └── SavedProperty
          │
          └── Property

Relationship:

User 1 → Many SavedProperties
Property 1 → Many SavedProperties
User → Inquiries
User
  │
  └── Inquiry
          │
          ├── Property
          └── Project
User → Leads
User
  │
  └── Lead
          │
          ├── Property
          └── Project
User → Site Visits
User
  │
  └── SiteVisit
          │
          └── Property
Project → Property
Project
   │
   └── Properties

One project can contain multiple properties.

17. Data Validation Rules

Every model must use Mongoose validation.

Email

Validate proper email format.

Phone

Validate proper phone format.

Password

Passwords must:

Be hashed
Never be stored as plain text
Never be returned in responses
Price

Price must:

Be numeric
Be greater than or equal to zero
Rating

Rating must be between:

1 and 5
Slug

Slugs should:

Be lowercase
Be URL-friendly
Be unique
18. Timestamps

All important models should use:

createdAt
updatedAt

Use Mongoose timestamps where appropriate.

19. Soft Delete

For important business records, prefer soft deletion where appropriate instead of permanently deleting data.

Example:

isDeleted: Boolean
deletedAt: Date

Use this especially for:

Properties
Projects
Customers
Leads
Inquiries

Do not expose deleted records through normal APIs.

20. Pagination

Large collections must support pagination.

Example:

GET /api/properties?page=1&limit=10

Backend should return:

{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
21. Database Indexing

Create indexes for frequently searched fields.

Users
email
role
isActive
Properties
slug
city
propertyType
price
status
featured
createdAt
Projects
slug
city
projectType
status
featured
createdAt
Leads
status
source
assignedTo
email
phone
createdAt
Inquiries
customer
property
project
status
createdAt
Site Visits
customer
property
status
requestedDate
22. Security Rules

Models must never expose sensitive information.

User Password

Never return:

password

from APIs.

Use field selection or serialization to exclude passwords.

Admin

Admin users cannot be created through public registration.

References

Validate referenced ObjectIds before processing database operations.

23. Model Naming Convention

Use singular PascalCase names for Mongoose models:

User
Property
Project
Lead
Inquiry
SiteVisit
SavedProperty
Notification
Testimonial
FAQ
CMSContent
Media
ContactMessage

MongoDB collections should use lowercase plural names.

24. Model Development Rules for Antigravity

When creating models:

Use TypeScript interfaces/types.
Use Mongoose schemas.
Add required validation.
Add enum validation where needed.
Add indexes.
Add timestamps.
Define relationships using ObjectId references.
Avoid unnecessary duplication.
Never store passwords in plain text.
Never store large media files directly in MongoDB.
Use Cloudinary for media.
Keep models modular.
Do not put business logic inside models unless appropriate.
Do not expose sensitive fields.
25. Recommended Model Dependency Order

Antigravity should create models in this order:

1. User
      ↓
2. Project
      ↓
3. Property
      ↓
4. SavedProperty
      ↓
5. Inquiry
      ↓
6. Lead
      ↓
7. SiteVisit
      ↓
8. Notification
      ↓
9. Testimonial
      ↓
10. FAQ
      ↓
11. CMSContent
      ↓
12. Media
      ↓
13. ContactMessage
26. Final Database Architecture
                         MongoDB
                            │
        ┌───────────────────┼────────────────────┐
        │                   │                    │
        ▼                   ▼                    ▼
      Users             Properties            Projects
        │                   │                    │
        │                   │                    │
        ├───────┐           ├───────┐            │
        │       │           │       │            │
        ▼       ▼           ▼       ▼            ▼
      Leads  Inquiries   Saved    Site       Properties
                           │      Visits
                           │
                           ▼
                      Notifications

        ┌─────────────────────────────────────────┐
        │ CMS / FAQ / Testimonials / Media        │
        └─────────────────────────────────────────┘
27. Final Antigravity Instruction

Use this models.md as the database model specification for Bhavya Homes.

Before creating or modifying a database model:

Check this document.
Follow the defined fields.
Follow the relationships.
Follow validation rules.
Add appropriate indexes.
Protect sensitive information.
Keep the model compatible with the existing architecture.
Do not create duplicate models for the same business entity.

If a new feature requires a new model, first determine whether an existing model can support the requirement.

If a new model is necessary, create it using the same standards defined in this document.

The final database must be:

Normalized where appropriate + Efficient + Secure + Indexed + Scalable + Maintainable + Production-Ready.
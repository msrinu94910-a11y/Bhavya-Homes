export type Role = 'ADMIN' | 'CUSTOMER';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  profileImage?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Property {
  _id: string;
  title: string;
  slug: string;
  description: string;
  propertyType: string;
  price: number;
  location: string;
  address: string;
  city: string;
  state: string;
  pincode?: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities: string[];
  images: string[];
  videos: string[];
  status: string;
  featured: boolean;
  isPublished: boolean;
  createdAt: string;
}

export interface Project {
  _id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  city: string;
  state: string;
  price?: number;
  projectType: string;
  status: string;
  images: string[];
  featured: boolean;
  isPublished: boolean;
  createdAt: string;
}

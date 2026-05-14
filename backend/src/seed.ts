import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserImport from './models/User.js';
import TicketImport from './models/Ticket.js';

const User = (UserImport as any).default || UserImport;
const Ticket = (TicketImport as any).default || TicketImport;
import bcrypt from 'bcryptjs';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Ticket.deleteMany({});
    console.log('Cleared existing Users and Tickets.');

    // Create Admin
    await User.create({
      username: 'admin_richwell',
      email: 'admin@prymage.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin user created: admin@prymage.com / admin123');

    // Create Staff
    await User.create({
      username: 'staff_member',
      email: 'staff@prymage.com',
      password: 'staff123',
      role: 'staff'
    });
    console.log('Staff user created: staff@prymage.com / staff123');

    // Create Sample Tickets
    const tickets = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        title: 'ERPNext Implementation Issue',
        description: 'Unable to import chart of accounts from Excel.',
        priority: 'High',
        status: 'Open'
      },
      {
        name: 'Sarah Smith',
        email: 'sarah@business.gh',
        title: 'GRA E-VAT Token Error',
        description: 'The API is returning a 401 when trying to push invoices.',
        priority: 'Critical',
        status: 'In Progress'
      },
      {
        name: 'Michael Boateng',
        email: 'mike@techcorp.ng',
        title: 'Staff Training Inquiry',
        description: 'Would like to schedule a session for 10 new accountants on Tally Prime.',
        priority: 'Medium',
        status: 'Open'
      }
    ];

    await Ticket.insertMany(tickets);
    console.log('Sample tickets created.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('Seeding failed:', error.message);
    if (error.errors) {
        console.error('Validation errors:', Object.keys(error.errors).map(key => error.errors[key].message));
    }
    process.exit(1);
  }
};

seedData();

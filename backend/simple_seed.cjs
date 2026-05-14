const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb+srv://bcict20103_db_user:lhqMLSfceFv6YWKI@cluster0.w1v27ni.mongodb.net/prymage?appName=Cluster0";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected...');

    await mongoose.connection.db.collection('users').deleteMany({});
    await mongoose.connection.db.collection('tickets').deleteMany({});

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const staffHashed = await bcrypt.hash('staff123', 10);

    await mongoose.connection.db.collection('users').insertMany([
      {
        username: 'admin_richwell',
        email: 'admin@prymage.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date()
      },
      {
        username: 'staff_member',
        email: 'staff@prymage.com',
        password: staffHashed,
        role: 'staff',
        createdAt: new Date()
      }
    ]);

    await mongoose.connection.db.collection('tickets').insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        title: 'ERPNext Implementation Issue',
        description: 'Unable to import chart of accounts from Excel.',
        priority: 'High',
        status: 'Open',
        notes: [],
        createdAt: new Date()
      },
      {
        name: 'Sarah Smith',
        email: 'sarah@business.gh',
        title: 'GRA E-VAT Token Error',
        description: 'The API is returning a 401 when trying to push invoices.',
        priority: 'Critical',
        status: 'In Progress',
        notes: [],
        createdAt: new Date()
      }
    ]);

    console.log('Seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();

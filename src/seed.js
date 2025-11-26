import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import User from './models/User.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    const email = process.env.ADMIN_EMAIL || 'admin@cleaning.local';
    const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
    const name = process.env.ADMIN_NAME || 'Admin';
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, password, role: 'admin' });
      console.log('Admin user created:', { id: user._id, email: user.email });
    } else {
      if (user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
      }
      console.log('Admin user exists:', { id: user._id, email: user.email });
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();

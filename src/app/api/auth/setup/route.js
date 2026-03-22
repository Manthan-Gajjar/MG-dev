import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // Prevent creating multiple users if one already exists
    const usersCount = await User.countDocuments();
    if (usersCount > 0) {
      return NextResponse.json({ error: 'Setup already completed' }, { status: 403 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword });
    
    return NextResponse.json({ success: true, email: user.email });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

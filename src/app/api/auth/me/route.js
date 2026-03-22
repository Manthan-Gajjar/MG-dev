import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ user: null });
    }

    // You can also look up the user in MongoDB here if you need more details
    return NextResponse.json({ user: payload });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

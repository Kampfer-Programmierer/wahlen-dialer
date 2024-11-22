import { NextResponse } from 'next/server';
import dbConnect from '../../utils/dbConnect';
import User from '../../models/Agents';
import bcrypt from 'bcryptjs';

export async function GET() {
  await dbConnect();
  try {
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json(); 
    const hashedPassword = await bcrypt.hash(body.password, 10); 
    const userData = { ...body, password: hashedPassword };

    // Save the user to the database
    const user = await User.create(userData);

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

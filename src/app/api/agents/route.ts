import { NextResponse } from 'next/server';
import dbConnect from '../../utils/dbConnect';
import User from '../../models/Agents';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1'); // Default to page 1
    const limit = parseInt(searchParams.get('limit') || '10'); // Default to 10 items per page

    const skip = (page - 1) * limit;

    const agents = await User.find({}).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json(
      {
        success: true,
        data: {
          agents,
          currentPage: page,
          totalPages,
          totalUsers,
        },
      },
      { status: 200 }
    );
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

    const user = await User.create(userData);

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

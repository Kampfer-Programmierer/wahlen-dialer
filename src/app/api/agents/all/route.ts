import { NextResponse } from 'next/server';
import dbConnect from '~/app/utils/dbConnect';
import User from '~/app/models/Agents'

export async function GET(req: Request) {
  await dbConnect();

  try {
    const agents = await User.find({});
  

    return NextResponse.json(
      {
        success: true,
        data: agents
        },
      
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
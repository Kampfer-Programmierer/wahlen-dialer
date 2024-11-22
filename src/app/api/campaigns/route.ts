import { NextResponse } from "next/server";
import { dbConnect } from "~/server/db";
import Campaign from "~/app/models/Campaign";

export async function GET() {
    await dbConnect();
    try {
      const campaigns = await Campaign.find({});
      return NextResponse.json({ success: true, data: campaigns }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }

  export async function POST(req: Request) {
    await dbConnect();
  
    try {
      const body = await req.json(); 
  
      // Save the user to the database
      const campaign = await Campaign.create(body);
  
      return NextResponse.json({ success: true, data: campaign }, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }
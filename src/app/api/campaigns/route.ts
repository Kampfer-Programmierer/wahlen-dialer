import { NextResponse } from "next/server";
import { dbConnect } from "~/server/db";
import Campaign from "~/app/models/Campaign";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1'); // Default to page 1
    const limit = parseInt(searchParams.get('limit') || '10'); // Default to 10 items per page

    const skip = (page - 1) * limit;

    const campaigns = await Campaign.find({}).skip(skip).limit(limit);
    const totalCampaigns = await Campaign.countDocuments();

    const totalPages = Math.ceil(totalCampaigns / limit);

    return NextResponse.json(
      {
        success: true,
        data: {
          campaigns,
          currentPage: page,
          totalPages,
          totalCampaigns,
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
  
      // Save the user to the database
      const campaign = await Campaign.create(body);
  
      return NextResponse.json({ success: true, data: campaign }, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }
import { NextResponse } from "next/server";
import { dbConnect } from "~/server/db";
import Customer from "~/app/models/Customer";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1'); // Default to page 1
    const limit = parseInt(searchParams.get('limit') || '10'); // Default to 10 items per page

    const skip = (page - 1) * limit;

    const customers = await Customer.find({}).skip(skip).limit(limit);
    const totalCustomers = await Customer.countDocuments();

    const totalPages = Math.ceil(totalCustomers / limit);

    return NextResponse.json(
      {
        success: true,
        data: {
          customers,
          currentPage: page,
          totalPages,
          totalCustomers,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

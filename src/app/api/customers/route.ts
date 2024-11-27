import { NextResponse } from "next/server";
import { dbConnect } from "~/server/db";
import Customer from "~/app/models/Customer";

export async function GET() {
  await dbConnect();
  try {
    const customers = await Customer.find({});
    return NextResponse.json(
      { success: true, data: customers },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    if (body.email === null || body.email === "") {
      delete body.email;
    }

    // Save the user to the database
    const customer = await Customer.create(body);

    return NextResponse.json(
      { success: true, data: customer },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

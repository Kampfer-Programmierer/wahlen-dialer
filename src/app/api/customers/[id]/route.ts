import { NextResponse } from "next/server";
import Customer from "~/app/models/Customer";
import { dbConnect } from "~/server/db";

await dbConnect();

/**
 * Fetch a specific Customer by ID
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const customer = await Customer.findById(id);
    if (!customer) {
      return NextResponse.json(
        { success: false, message: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: customer },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// * update a specific Customer by ID

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const body = await req.json();
  
      const updatedCustomer = await Customer.findByIdAndUpdate(id, body, {
        new: true, // Return the updated document
        runValidators: true, // Validate fields during update
      });
  
      if (!updatedCustomer) {
        return NextResponse.json(
          { success: false, message: 'Customer not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, data: updatedCustomer },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
  }
  
//   * Delete a specific Customer by ID

  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
  
      const deletedCustomer = await Customer.findByIdAndDelete(id);
  
      if (!deletedCustomer) {
        return NextResponse.json(
          { success: false, message: 'Customer not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, data: deletedCustomer },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
  }
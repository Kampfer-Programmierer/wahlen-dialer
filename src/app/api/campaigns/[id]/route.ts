import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import Campaign from "~/app/models/Campaign";

await dbConnect();

/**
 * Fetch a specific Campaign by ID
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return NextResponse.json(
        { success: false, message: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: campaign },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// * update a specific Campaign by ID

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const body = await req.json();
  
      const updatedCampaign = await Campaign.findByIdAndUpdate(id, body, {
        new: true, // Return the updated document
        runValidators: true, // Validate fields during update
      });
  
      if (!updatedCampaign) {
        return NextResponse.json(
          { success: false, message: 'Campaign not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, data: updatedCampaign },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
  }
  
//   * Delete a specific Campaign by ID

  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
  
      const deletedCampaign = await Campaign.findByIdAndDelete(id);
  
      if (!deletedCampaign) {
        return NextResponse.json(
          { success: false, message: 'Campaign not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, data: deletedCampaign },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
  }
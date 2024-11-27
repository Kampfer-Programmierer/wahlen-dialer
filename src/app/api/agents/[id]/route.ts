import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/Agents';
import bcrypt from 'bcryptjs';

// Connect to the database
await dbConnect();

/**
 * GET /api/agents/:id
 * Fetch a specific agent by ID
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const agent = await User.findById(id);
    if (!agent) {
      return NextResponse.json(
        { success: false, message: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: agent },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

/**
 * PUT /api/agents/:id
 * Update an agent by ID
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const updatedAgent = await User.findByIdAndUpdate(id, body, {
      new: true, // Return the updated document
      runValidators: true, // Validate fields during update
    });

    if (!updatedAgent) {
      return NextResponse.json(
        { success: false, message: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedAgent },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

/**
 * DELETE /api/agents/:id
 * Delete an agent by ID
 */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const deletedAgent = await User.findByIdAndDelete(id);

    if (!deletedAgent) {
      return NextResponse.json(
        { success: false, message: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: deletedAgent },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

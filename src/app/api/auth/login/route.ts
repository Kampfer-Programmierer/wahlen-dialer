import bcrypt from "bcryptjs";
import { SignJWT } from "jose"; // Import from jose
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/Agents';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found!" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials!" },
        { status: 401 }
      );
    }

    // Sign the JWT token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!); 
    const token = await new SignJWT({ id: user._id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' }) // You can change the algorithm here if needed
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    return NextResponse.json(
      { success: true, token, user: { id: user._id, email: user.email } },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

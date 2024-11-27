import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { dbConnect } from "~/server/db";
import Customer from "~/app/models/Customer";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const successfulCustomers = [];
    const failedCustomers = [];

    for (const customerData of jsonData) {
      try {
        const newCustomer = await Customer.create(customerData);
        successfulCustomers.push(newCustomer);
      } catch (error) {
        if (error.code === 11000) {
          // Duplicate key error
          failedCustomers.push({
            customer: customerData,
            reason: "Duplicate entry"
          });
        } else {
          failedCustomers.push({
            customer: customerData,
            reason: error.message
          });
        }
      }
    }

    return NextResponse.json({
      message: "Import processed",
      successCount: successfulCustomers.length,
      failedCount: failedCustomers.length,
      failedCustomers
    }, { status: 200 });

  } catch (error) {
    console.error("Excel import error:", error);
    return NextResponse.json({
      error: "Failed to import customers",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
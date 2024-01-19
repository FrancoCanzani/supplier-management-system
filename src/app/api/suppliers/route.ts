import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { Supplier } from '@/lib/database/schemas/supplierSchema';
import dbConnect from '@/lib/database/dbConnect';

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error('User ID not available.');
    }

    await dbConnect();

    const suppliers = await Supplier.find({ userId });

    return NextResponse.json(suppliers || {});
  } catch (error: any) {
    throw new Error(
      'Error fetching suppliers: ' + (error.message || 'Unknown error')
    );
  }
}

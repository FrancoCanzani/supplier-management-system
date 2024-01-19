import { NextResponse } from 'next/server';
import { Supplier } from '@/lib/database/schemas/supplierSchema';
import dbConnect from '@/lib/database/dbConnect';
import { currentUser } from '@clerk/nextjs';

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error('User ID not available.');
    }

    const userId = user.id;

    await dbConnect();

    const suppliers = await Supplier.find({ userId });

    return NextResponse.json(suppliers || {});
  } catch (error: any) {
    throw new Error(
      'Error fetching suppliers: ' + (error.message || 'Unknown error')
    );
  }
}

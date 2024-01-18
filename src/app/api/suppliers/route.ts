import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { Supplier } from '@/lib/database/schemas/supplierSchema';
import dbConnect from '@/lib/database/dbConnect';

export async function GET() {
  const { userId } = auth();

  await dbConnect();

  const suppliers = await Supplier.find({ userId });

  return NextResponse.json(suppliers);
}

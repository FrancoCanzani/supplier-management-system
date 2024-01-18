import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/database/dbConnect';
import { Task } from '@/lib/database/schemas/taskSchema';

export async function GET() {
  const { userId } = auth();

  await dbConnect();

  const tasks = await Task.find({ userId });

  return NextResponse.json(tasks);
}

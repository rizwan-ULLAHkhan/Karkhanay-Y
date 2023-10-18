import clientPromise from '../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("GET function accessed for fetching categories");
  const client = await clientPromise;
  const db = client.db('Karkhanay');
  
  // Assuming categories are in their own collection:
  const collection = db.collection('Categories');

  try {
    const categories = await collection.find().toArray();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("MongoDB Error:", (error as Error).message, (error as Error).stack);
    return NextResponse.json({ message: 'Failed to fetch categories', error: (error as Error).message });
  }
}

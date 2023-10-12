import clientPromise from '../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';


// Named export for handling GET requests
export async function GET(req: NextRequest, res: NextResponse) {
  console.log("GET function accessed");
  
  const client = await clientPromise;
  const db = client.db('Karkhanay');  
  const collection = db.collection('Ks-collection');

  try {
    const products = await collection.find({}).toArray(); // Fetch all products from the database
    return NextResponse.json(products);
  } catch (error) {
    console.error("MongoDB Error:", (error as Error).message, (error as Error).stack);
    return NextResponse.json({ message: 'Failed to fetch products', error: (error as Error).message });
  }
}

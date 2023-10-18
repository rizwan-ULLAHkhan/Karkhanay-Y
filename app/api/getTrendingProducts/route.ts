import clientPromise from '../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("GET function accessed to fetch trending products");

  const client = await clientPromise;
  const db = client.db('Karkhanay');  
  const collection = db.collection('Ks-collection');

  try {
    const trendingProducts = await collection.find({ isTrending: true }).toArray(); 
    return NextResponse.json(trendingProducts);
  } catch (error) {
    console.error("MongoDB Error:", (error as Error).message, (error as Error).stack);
    return NextResponse.json({ message: 'Failed to fetch trending products', error: (error as Error).message });
  }
}

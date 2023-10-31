import clientPromise from '../../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';

// Named export for handling GET requests
export async function GET(req: NextRequest, context: { params: any }) {
  console.log("GET function accessed");
  
  const productId = context.params['productId']; // Extract the productId from the URL
  console.log(productId, "product IID")
  
  if (!productId) {
    return NextResponse.json({ message: 'Product ID not provided' });
  }

  const client = await clientPromise;
  const db = client.db('Karkhanay');
  const collection = db.collection('Ks-collection');

  try {
    // Find the product by its ObjectId
    const product = await collection.findOne({ _id: new ObjectId(productId) });
    
    // Check if the product exists
    if (!product) {
      return NextResponse.json({ message: 'Product not found' });
    }

    return NextResponse.json(product);  // Send the product data as response

  } catch (error) {
    console.error("MongoDB Error:", (error as Error).message, (error as Error).stack);
    return NextResponse.json({ message: 'Failed to fetch product data', error: (error as Error).message });
  }
}

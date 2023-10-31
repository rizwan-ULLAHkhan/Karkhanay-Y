
import clientPromise from '../../../lib/mongodb'
import { NextResponse, NextRequest } from 'next/server';


// Named export for handling GET requests
export async function GET(req: NextRequest, context: { params: any }) {
  console.log("GET function accessed for search");
  
  const searchTerm=req.nextUrl.searchParams.get("query")
  
  
  if (!searchTerm) {
    return NextResponse.json({ message: 'Search term not provided' });
  }

  const client = await clientPromise;
  const db = client.db('Karkhanay');
  const collection = db.collection('Ks-collection');
  collection.createIndex({ name: "text", description: "text" });
  console.log("searching test")

  try {
    // Find products matching the search term
    const products = await collection.find({
      $text: { $search: searchTerm }
    }).toArray();
    console.log(products,"checking products")
    // Check if any products were found
    if (products.length === 0) {
      
      return NextResponse.json({ message: 'No products found' });
    }

    return NextResponse.json(products);  // Send the products data as response

  } catch (error) {
    console.error("MongoDB Error:", (error as Error).message, (error as Error).stack);
    return NextResponse.json({ message: 'Failed to fetch products data', error: (error as Error).message });
  }
}

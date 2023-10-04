import clientPromise from '../../../lib/mongodb'
import { NextResponse,NextRequest } from 'next/server'

interface ProductRequestBody {
  name: string;
  description: string;
  price: string;
  quantity: string;
  images: any; // Use a more specific type if you have one
}


// Named export for handling POST requests
export async function POST(req: NextRequest, res: NextResponse) {
  // There's no need to check for req.method === 'POST' since the named export does that implicitly
  const body = req.body as unknown;
  const { name, description, price, quantity, images } = body as ProductRequestBody;


  

  const client = await clientPromise;
  console.log('1')
  const db = client.db('karkhanay');  // Use your actual database name
  console.log('2')
  const collection = db.collection('K-collection');
  console.log('3')

  const newProduct = {
    name,
    description,
    price,
    quantity,
    images,
    createdAt: new Date(),
  };

  try {
    console.log(newProduct)
    const result = await collection.insertOne(newProduct) as any;

    if (result.insertedCount === 1) {
      return NextResponse.json({ message: 'Product created successfully!', productId: result.insertedId });
    }

    throw new Error("Failed to insert product into database.");
  } catch (error) { 
    console.error("Error inserting product:", error);
    NextResponse.json({ message: 'Failed to create product' });
  }
}
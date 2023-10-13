
import clientPromise from '../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';





interface ProductRequestBody {
  userEmail:string
  name: string;
  description: string;
  price: string;
  quantity: string;
  urls: string[];
  imageReferences: string[],
  inStock: boolean
}

// Named export for handling POST requests
export async function POST(req: NextRequest, res: NextResponse) {
  





  console.log("POST function accessed");
  const data = await req.json();
  console.log(data);
  // Extracting the body directly
  const { userEmail,name, description, price, quantity, urls, imageReferences, inStock } = data as ProductRequestBody;
  console.log(urls, "j")

  const client = await clientPromise;
  const db = client.db('Karkhanay');
  const collection = db.collection('Ks-collection');

  const newProduct = {
    userEmail,
    name,
    description,
    price,
    quantity,
    urls,
    imageReferences,
    inStock,
    createdAt: new Date(),
  };

  try {
    const result = await collection.insertOne(newProduct);
    console.log("Insert result:", result);
    return NextResponse.json({ message: 'Product created successfully!' });
  } catch (error) {
    console.error("MongoDB Error:", (error as Error).message, (error as Error).stack);
    return NextResponse.json({ message: 'Failed to create product', error: (error as Error).message });
  }

}
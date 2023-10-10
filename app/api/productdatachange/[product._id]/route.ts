import clientPromise from '../../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';



interface UpdateRequestBody {
  inStock: boolean;
}

// Named export for handling PUT requests
export async function PUT(req: NextRequest, context: { params:any } ) {
  console.log("PUT function accessed");

  const productId = context.params['product._id'];// Extract the productId from the URL
  console.log(productId)
  if (!productId) {
    return NextResponse.json({ message: 'Product ID not provided' });
  }

  const data = await req.json();
  console.log(data)
  const { inStock } = data as UpdateRequestBody;
  console.log(inStock)

  const client = await clientPromise;
  const db = client.db('Karkhanay');
  const collection = db.collection('Ks-collection');

  try {
    const result = await collection.updateOne({ _id: new ObjectId(productId) }, { $set: { inStock: inStock } });

    console.log("Matched documents:", result.matchedCount);
    console.log("Modified documents:", result.modifiedCount);

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Product not found or inStock value not changed' });
    }

    console.log("Update result:", result);
    return NextResponse.json({ message: 'Product updated successfully!' });
  } catch (error) {
    console.error("MongoDB Error:", (error as Error).message, (error as Error).stack);
    return NextResponse.json({ message: 'Failed to update product', error: (error as Error).message });
  }
}

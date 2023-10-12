import clientPromise from '../../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { Sclient } from '@/app/sanityclientsetup'



interface UpdateRequestBody {
  inStock: boolean;
}

// Named export for handling PUT requests
export async function PUT(req: NextRequest, context: { params: any }) {
  console.log("PUT function accessed");
  console.log(context)

  const productId = context.params['id'];// Extract the productId from the URL
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





export async function DELETE(req: NextRequest, context: { params: any }) {
  console.log("Delete function accessed")
  console.log(context)


  const productId = context.params['id']; // Extract the productId from the URL
  console.log(productId)
  const client = await clientPromise;
  const db = client.db('Karkhanay');
  const collection = db.collection('Ks-collection');

  try {

    // Delete from Sanity
    // Fetch the MongoDB document using the productId
    const productDocument = await collection.findOne({ _id: new ObjectId(productId) });
    console.log("this check",productDocument)

    // Check if the productDocument has imageReferences
    if (productDocument && productDocument.imageReferences && productDocument.imageReferences.length > 0) {
      for (const imageRef of productDocument.imageReferences) {
        const assetId = imageRef._ref;
        await Sclient.delete(assetId).catch(err => {
          console.error(`Error deleting asset with ID ${assetId} from Sanity:`, err);
        });
      }
    }


    const result = await collection.deleteOne({ _id: new ObjectId(productId) });
    console.log(result)
    if (result.deletedCount === 0) {
      NextResponse.json({ message: 'Product not found' });
      return;
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    NextResponse.json({ message: 'Failed to delete the product', error });
  }
}


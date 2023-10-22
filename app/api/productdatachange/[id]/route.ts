import clientPromise from '../../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { Sclient } from '@/app/sanityclientsetup'



interface UpdateRequestBody {
  inStock: boolean;
  isDeleted?: boolean;
}

// Named export for handling PUT requests
export async function PUT(req: NextRequest, context: { params: any }) {
  console.log("PUT function accessed");
  console.log(context)

  const userEmail = req.headers.get('user-email');
  if (!userEmail) {
    return NextResponse.json({ message: 'User email not provided in headers' });
  }

  const productId = context.params['id'];// Extract the productId from the URL
  console.log(productId)
  if (!productId) {
    return NextResponse.json({ message: 'Product ID not provided' });
  }

  const data = await req.json();
  console.log(data)
  const { inStock, isDeleted } = data as UpdateRequestBody;

  const client = await clientPromise;
  const db = client.db('Karkhanay');
  const collection = db.collection('Ks-collection');

  try {

    const existingProduct = await collection.findOne({ _id: new ObjectId(productId) });

    // Check if the product exists
    if (!existingProduct) {
      return NextResponse.json({ message: 'Product not found' });
    }

    // Check if the user has the permission to modify the product
    if (existingProduct.userEmail !== userEmail) {
      return NextResponse.json({ message: 'You do not have permission to modify this product' });
    }

    let updateData: any = {};

    if (typeof inStock !== 'undefined') {
      updateData.inStock = inStock;
    }

    if (typeof isDeleted !== 'undefined') {
      updateData.isDeleted = isDeleted;
    }





    const result = await collection.updateOne({ _id: new ObjectId(productId) }, { $set: updateData });

    console.log("Matched documents:", result.matchedCount);
    console.log("Modified documents:", result.modifiedCount);

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'Product not updated. Maybe the provided values are the same as current values?' });
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
  const userEmail = req.headers.get('user-email');
  if (!userEmail) {
    return NextResponse.json({ message: 'User email not provided in headers' });
  }


  const productId = context.params['id']; // Extract the productId from the URL
  
  const client = await clientPromise;
  const db = client.db('Karkhanay');
  const collection = db.collection('Ks-collection');
  

  try {

    // Check if the product exists
    const existingProduct = await collection.findOne({ _id: new ObjectId(productId) });
    console.log(existingProduct,"product check")
    if (!existingProduct) {
      return NextResponse.json({ message: 'Product not found' });
    }
    const productCategory = existingProduct.category;
    console.log(productCategory)

    // Check if the user has the permission to delete the product
    if (existingProduct.userEmail !== userEmail) {
      return NextResponse.json({ message: 'You do not have permission to delete this product' });
    }

    // Delete from Sanity
    // 1. Retrieve and store image references:
    const productDocument = await collection.findOne({ _id: new ObjectId(productId) });
    if (!productDocument) {
      return NextResponse.json({ message: 'Product not found' });
    }
    const imageReferences = productDocument.imageReferences;

    // 2. Delete images from Sanity:
    if (imageReferences && imageReferences.length > 0) {
      for (const imageRef of imageReferences) {
        const assetId = imageRef._ref;
        await Sclient.delete(assetId).catch(err => {
          console.error(`Error deleting asset with ID ${assetId} from Sanity:`, err);
        });
      }
    }


    // 3. Delete MongoDB entry:
    const result = await collection.deleteOne({ _id: new ObjectId(productId) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Product not found after deleting images from Sanity' });
    }


    //category update or delete
    const categoryCollection = db.collection('Categories-collection');
    console.log(categoryCollection,"gg  ")
    const existingCategory = await categoryCollection.findOne({ name: productCategory });
    if (!existingCategory) {
      console.log(existingCategory,"sd")
      return NextResponse.json({ message: 'Category not found. Inconsistency detected.' });
    }


    if (existingCategory.count > 1) {
      await categoryCollection.updateOne({ name: productCategory }, { $inc: { count: -1 } });
  } else {
      await categoryCollection.deleteOne({ name: productCategory });
      console.log("reaching here")
  }


    return NextResponse.json({ message: 'Product deleted successfully' });

  } catch (error) {
    NextResponse.json({ message: 'Failed to delete the product', error });
  }

}


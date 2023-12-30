import clientPromise from '../../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { Sclient } from '../../../sanityclientsetup'



export async function PUT(req: NextRequest, context: { params: any }) {
    console.log("Delete function accessed")
    
    
    console.log(context)
    const userEmail: string | null = req.headers.get('User-Email');
    if (!userEmail) {
      return NextResponse.json({ message: 'User email not provided in headers' });
    }
  
  
    const productId: string = context.params['id']; // Extract the productId from the URL
    console.log("memhmud zafar", productId)
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
      const productIsTrending = existingProduct.is_trending;
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
        await logError("DELETE", productId, "Failed to delete from Ks-collection");
        return NextResponse.json({ message: 'Product not found after deleting images from Sanity' });
      }
  
  
      //category update or delete
      const categoryCollection = db.collection('Categories-collection');
      console.log(categoryCollection,"gg  ")
      const existingCategory = await categoryCollection.findOne({ name: productCategory });
      console.log(existingCategory, "dusk till dawn")
      if (!existingCategory) {
        console.log(existingCategory,"sd")
        return NextResponse.json({ message: 'Category not found. Inconsistency detected.' });
      }
  
  
     // Remove productId from productIds array
     await categoryCollection.updateOne({ name: productCategory }, { $pull: { productIds: new ObjectId(productId) } });
  
      // If product was trending, remove productId from trendingProductIDs array
      if (productIsTrending) {
        await categoryCollection.updateOne({ name: productCategory }, { $pull: { trendingProductIDs: new ObjectId(productId) } });
      }
  
      // Check if productIds array is empty, and if so, delete the category
      const updatedCategory = await categoryCollection.findOne({ name: productCategory });
      if (updatedCategory && updatedCategory.productIds.length === 0) {
        await categoryCollection.deleteOne({ name: productCategory });
      }
  
      return NextResponse.json({ message: 'Product deleted successfully' });
  
    } catch (error) {
      await logError("DELETE", productId, (error as Error).message, "Additional context if needed")
      return NextResponse.json({ message: 'Failed to delete the product', error });
    }
  
  
  
    async function logError(operation: string, productId: string, errorMessage: string, additionalInfo: string = "") {
      const errorLog = {
          timestamp: new Date(),
          operation,
          productId,
          errorMessage,
          additionalInfo
      };
  
      try {
          await db.collection('ErrorLogs').insertOne(errorLog);
      } catch (logError) {
          console.error("Failed to log error:", logError);
      }
  }
  }
  
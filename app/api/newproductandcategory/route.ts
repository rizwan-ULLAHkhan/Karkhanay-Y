import clientPromise from '../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';

interface ProductRequestBody {
  userEmail: string;
  userName:string;
  userImage:string;
  userId:string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  urls: string[];
  imageReferences: string[];
  inStock: boolean;
  category: string;
  is_trending: boolean;
  isDeleted:boolean;
}

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("POST function accessed");
  const data = await req.json();
  
  const { userId,userName,userImage,userEmail, name, description, price, quantity, urls, imageReferences, inStock, category, is_trending,isDeleted } = data as ProductRequestBody;

  const client = await clientPromise;
  const db = client.db('Karkhanay');

  // Category logic
  const categoryCollection = db.collection('Categories-collection');
  


  // Proceed with product insertion
  const productCollection = db.collection('Ks-collection');

  const newProduct = {
    userId,
    userName,
    userImage,
    userEmail,
    name,
    description,
    price,
    quantity,
    urls,
    imageReferences,
    inStock,
    category,
    isDeleted,
    is_trending,
    createdAt: new Date(),
  };

  let insertedProductId;
  
  try {
    const result = await productCollection.insertOne(newProduct);
    insertedProductId = result.insertedId;
  } catch (error) {
    console.error("MongoDB Error when inserting product:", (error as Error).message, (error as Error).stack);
    return NextResponse.json({ message: 'Failed to create product', error: (error as Error).message });
  }

  // Check if category exists
  const existingCategory = await categoryCollection.findOne({ name: category });

  // If category doesn't exist, insert it
  if (!existingCategory) {
    try {
      const newCategoryData = { 
        name: category, 
        productIds: [insertedProductId],
        trendingProductIDs: is_trending ? [insertedProductId] : [] // Only add if is_trending is true
    };
    await categoryCollection.insertOne(newCategoryData); 
    
  } catch (error) {
      console.error("MongoDB Error when inserting category:", (error as Error).message, (error as Error).stack);
      // Rollback: Delete the previously inserted product
      await productCollection.deleteOne({ _id: insertedProductId });
      return NextResponse.json({ message: 'Failed to add category', error: (error as Error).message });
  }
  } else {
    // If category exists, push the product's ID to its productIds list
    try {
        await categoryCollection.updateOne(
            { name: category }, 
            { 
                $push: { 
                    productIds: insertedProductId,
                    trendingProductIDs: is_trending ? insertedProductId : undefined // Only add if is_trending is true
                }
            }
        );
    } catch (updateError) {
        console.error("MongoDB Error when updating category product IDs:", (updateError as Error).message, (updateError as Error).stack);
        // Rollback: Delete the previously inserted product
        await productCollection.deleteOne({ _id: insertedProductId });
        return NextResponse.json({ message: 'Failed to update category', error: (updateError as Error).message });
    }
}

  return NextResponse.json({ message: 'Product created successfully!' });
}






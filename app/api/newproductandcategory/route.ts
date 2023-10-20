import clientPromise from '../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';

interface ProductRequestBody {
  userEmail: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  urls: string[];
  imageReferences: string[];
  inStock: boolean;
  category: string;
  is_trending: boolean;
}

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("POST function accessed");
  const data = await req.json();
  
  const { userEmail, name, description, price, quantity, urls, imageReferences, inStock, category, is_trending } = data as ProductRequestBody;

  const client = await clientPromise;
  const db = client.db('Karkhanay');

  // Category logic
  const categoryCollection = db.collection('Categories-collection');
  
  // Check if category exists
  const existingCategory = await categoryCollection.findOne({ name: category });
  let categoryAdded = false;  // A flag to track if we added a category

  // If category doesn't exist, insert it
  if (!existingCategory) {
    try {
      await categoryCollection.insertOne({ name: category, count: 1 }); // Initialize count as 1
      categoryAdded = true; // Update the flag
    } catch (error) {
      console.error("MongoDB Error when inserting category:", (error as Error).message, (error as Error).stack);
      return NextResponse.json({ message: 'Failed to add category', error: (error as Error).message });
    }
  } else {
    // If category exists, increment its count
    try {
      await categoryCollection.updateOne({ name: category }, { $inc: { count: 1 } });
    } catch (updateError) {
      console.error("MongoDB Error when updating category count:", (updateError as Error).message, (updateError as Error).stack);
      // Handle this error appropriately, perhaps returning a response or continuing with the next steps
    }
  }

  // Proceed with product insertion
  const productCollection = db.collection('Ks-collection');

  const newProduct = {
    userEmail,
    name,
    description,
    price,
    quantity,
    urls,
    imageReferences,
    inStock,
    category,
    is_trending,
    createdAt: new Date(),
  };

  try {
    const result = await productCollection.insertOne(newProduct);
    console.log("Insert result:", result);
    return NextResponse.json({ message: 'Product created successfully!' });
  } catch (error) {
    console.error("MongoDB Error when inserting product:", (error as Error).message, (error as Error).stack);
    
    // If the product insertion failed and we added a category, let's rollback (decrement the count or delete) that category
    if (categoryAdded) {
      try {
        await categoryCollection.deleteOne({ name: category });
      } catch (deleteError) {
        console.error("Error during rollback - couldn't delete category:", (deleteError as Error).message, (deleteError as Error).stack);
      }
    } else {
      // If it was an existing category, decrement its count
      try {
        await categoryCollection.updateOne({ name: category }, { $inc: { count: -1 } });
      } catch (updateError) {
        console.error("Error during rollback - couldn't decrement category count:", (updateError as Error).message, (updateError as Error).stack);
      }
    }

    return NextResponse.json({ message: 'Failed to create product', error: (error as Error).message });
  }
}
import clientPromise from '../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';

interface CategoryRequestBody {
  category: string;
}

// Named export for handling POST requests for categories
export async function POST(req: NextRequest, res: NextResponse) {
  console.log("POST function for category accessed");
  
  const data = await req.json();
  const { category } = data as CategoryRequestBody;

  const client = await clientPromise;
  const db = client.db('Karkhanay');
  
  // Handle category in its collection
  const categoryCollection = db.collection('C-collection');
  try {
    // Check if the category already exists
    const existingCategory = await categoryCollection.findOne({ name: category });
    
    if (existingCategory) {
      // Update the count of the existing category
      await categoryCollection.updateOne(
        { name: category },
        { $inc: { count: 1 } }
      );
      console.log("Category count updated");
    } else {
      // Insert the new category
      await categoryCollection.insertOne({
        name: category,
        count: 1
      });
      console.log("New category added");
    }

    return NextResponse.json({ message: 'Category processed successfully!' });
  } catch (error) {
    console.error("MongoDB Error:", (error as Error).message, (error as Error).stack);
    return NextResponse.json({ message: 'Failed to process category', error: (error as Error).message });
  }
}

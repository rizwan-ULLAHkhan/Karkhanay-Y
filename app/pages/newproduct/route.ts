import clientPromise from '../../../lib/mongodb'
import { NextResponse,NextRequest } from 'next/server'
import upload from '../../../lib/multer';

interface ProductRequestBody {
  name: string;
  description: string;
  price: string;
  quantity: string;
  images: any; // Use a more specific type if you have one
}

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

interface ExtendedNextRequest extends NextRequest {
  files: MulterFile[];
}

// Named export for handling POST requests
export async function POST(req: ExtendedNextRequest, res: NextResponse) {
  console.log("POST function accessed");

  
  await new Promise((resolve, reject) => {
    upload(req as any, res as any, err => {
      if (err) reject(err);
      else resolve(null);
    });
  });
  console.log("-1")




console.log("0")
  // There's no need to check for req.method === 'POST' since the named export does that implicitly
  const body = req.body as unknown;
  const { name, description, price, quantity } = body as ProductRequestBody;
  //const images = req.files as Express.Multer.File[];


  
  console.log("1")
  const client = await clientPromise;
  console.log("2")
  const db = client.db('Karkhanay');  // Use your actual database name
  console.log("3")
  const collection = db.collection('Ks-collection');
  

  const newProduct = {
    name,
    description,
    price,
    quantity,
    images: req.files.map(file => ({
      originalname: file.originalname,
      buffer: file.buffer,
      // You can add more fields here if needed
    })),
    createdAt: new Date(),
  };

  try {
    console.log("newProduct")
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
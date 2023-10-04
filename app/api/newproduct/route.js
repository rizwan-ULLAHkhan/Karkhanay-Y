// pages/api/products/create.js
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, description, price, quantity, images } = req.body;

  // Optional: Validate your data here
  if (!name || !description || !price || !quantity) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const client = await clientPromise;
  const db = client.db('');  // replace 'your_db_name' with your actual database name
  const collection = db.collection('products');

  const newProduct = {
    name,
    description,
    price,
    quantity,
    images,
    createdAt: new Date(),
  };

  try {
    const result = await collection.insertOne(newProduct);

    if (result.insertedCount === 1) {
      return res.status(201).json({ message: 'Product created successfully!', productId: result.insertedId });
    }

    throw new Error("Failed to insert product into database.");
  } catch (error) {
    console.error("Error inserting product:", error);
    res.status(500).json({ message: 'Failed to create product' });
  }
}

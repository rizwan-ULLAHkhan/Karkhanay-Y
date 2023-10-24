import clientPromise from '../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("GET function accessed for fetching categories with trending products");
  const client = await clientPromise;
  const db = client.db('Karkhanay');
  
  // Categories collection
  const categoriesCollection = db.collection('Categories-collection');

  // Products collection
  const productsCollection = db.collection('Ks-collection');

  try {
    const categories = await categoriesCollection.find().toArray();
    console.log(categories,"categories fetched from mongodb")

    const categoriesWithTrendingProducts = [];

    for (let category of categories) {
      // Fetch detailed product information for each ID in the trendingProductIDs array
      const trendingProducts = await productsCollection.find({ _id: { $in: category.trendingProductIDs }}).toArray();
      console.log(trendingProducts)
      // Combine the category name with its trending products
      categoriesWithTrendingProducts.push({
        categoryName: category.name,
        trendingProducts: trendingProducts
      });
    }

    return NextResponse.json(categoriesWithTrendingProducts);

  } catch (error) {
    console.error("MongoDB Error:", (error as Error).message, (error as Error).stack);
    return NextResponse.json({ message: 'Failed to fetch categories with trending products', error: (error as Error).message });
  }
}

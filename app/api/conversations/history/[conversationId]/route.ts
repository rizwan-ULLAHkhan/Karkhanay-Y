import clientPromise from '../../../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { Message } from '../../../../../models/messageModel';

// Named export for handling GET requests
export async function GET(req: NextRequest, context: { params: any }) {
  console.log("GET function accessed for conversationId");

  const conversationId = context.params['conversationId']; // Extract the productId from the URL
  console.log(conversationId, "conversation IID")

  if (!conversationId) {
    return NextResponse.json({ message: 'conversationId not provided' });
  }



  try {
    // Fetch messages from the database
    // Fetch messages from the database
    const messages = await Message.find({ conversationId: new ObjectId(conversationId) }).sort({ createdAt: 1 });


    console.log(messages, "checking if i get messages")

    console.log("found the dataaaaaaaaaaaaaaaaaaaaaaa")
    return NextResponse.json(messages);  // Send the product data as response

  } catch (error) {
    console.error("MongoDB Error:", (error as Error).message, (error as Error).stack);
    return NextResponse.json({ message: 'Failed to fetch product data', error: (error as Error).message });
  }
}

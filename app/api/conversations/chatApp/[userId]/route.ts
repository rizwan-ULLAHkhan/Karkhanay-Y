import clientPromise from '../../../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { Conversation } from '../../../../../models/conversationModel'; // Import your Conversation model

// Named export for handling GET requests
export async function GET(req: NextRequest, context: { params: any }) {
  console.log("GET function accessed for conversation sidebar");

  const userId = context.params['userId']; // Extract the userId from the URL
  console.log(userId, "user IID")

  if (!userId) {
    return NextResponse.json({ message: 'userId not provided' });
  }



  try {

    // Fetch all conversation documents where the user is either participant1 or participant2
    const conversations = await Conversation.find({
      $or: [
        { participant1: new ObjectId(userId) },
        { participant2: new ObjectId(userId) }
      ]
    }).sort({ createdAt: -1 }).select('participant1  participant2 participant2Name participant2Image createdAt'); // Selecting specific fields; // Sorting by most recent

    return NextResponse.json(conversations);

  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch conversation data for chatApp', error: (error as Error).message });
  }
}

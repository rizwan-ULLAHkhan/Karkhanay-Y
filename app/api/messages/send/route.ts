'use client'
import clientPromise from '../../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';
import {Message} from '../../../../models/messageModel'; // The path should be to where your Message model is saved

interface ChatMessageRequest {
    conversationId: string;
    sender: string;
    receiver: string;
    message: string;
  }
// Note: You should establish a connection to MongoDB and define the Message model as per your project structure.
// The Message import is based on your project's file organization.

export async function POST(req: NextRequest, res: NextResponse) {
    console.log("POST function accessed for Chat Message");

    const data = await req.json();
    console.log(data, "destructuring data")

    try {
        const { conversationId, sender, receiver, message } = data as ChatMessageRequest;
        

        // Create a new message document
        const newMessage = new Message({
            conversationId,
            sender,
            receiver,
            message, // This field should match the messageText field in your schema
            // createdAt will use the default value defined in the schema
        });
        // Save the message document to the database
        const savedMessage = await newMessage.save();
        console.log(savedMessage)

    }
         catch (error) {
        console.error("MongoDB Error when inserting chat message:", (error as Error).message, (error as Error).stack);
        return NextResponse.json({ message: 'Failed to send message', error: (error as Error).message });
    }

    return NextResponse.json({ message: 'Message sent successfully!' });
}

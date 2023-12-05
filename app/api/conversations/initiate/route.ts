import clientPromise from '../../../../lib/mongodb';
import { Conversation } from '../../../../models/conversationModel'; // Import your Conversation model
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    const client = await clientPromise;


    const { buyerId, vendorId, vendorName, vendorImage } = await req.json(); // Extract buyerId and vendorId from the request body

    // Try to find an existing conversation between the buyer and vendor
    const existingConversation = await Conversation.findOne({
        $or: [
            { participant1: buyerId, participant2: vendorId },
            { participant1: vendorId, participant2: buyerId },


        ]
    });

    let conversationId;
    if (existingConversation) {
        // If a conversation already exists, use its id
        conversationId = existingConversation._id;
    } else {
        // If no conversation exists, create a new one using the Conversation model
        const newConversation = await Conversation.create({
            participant1: buyerId,
            participant2: vendorId,
            participant2Name: vendorName, // The name of the vendor
            participant2Image: vendorImage, // The image of the vendor
            createdAt: new Date()
        });
        conversationId = newConversation._id;
    }

    return NextResponse.json({ conversationId }); // Return the conversationId in the response
}

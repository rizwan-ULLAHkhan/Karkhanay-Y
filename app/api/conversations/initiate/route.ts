
import { Conversation } from '../../../../models/conversationModel'; // Import your Conversation model
import { NextResponse, NextRequest } from 'next/server';

interface BuyerVendorData {
    buyerId: string;
    buyerName: string;
    buyerImage: string; // Assuming the image is represented by a URL or a string identifier
    vendorId: string;
    vendorName: string;
    vendorImage: string; // Similarly, a URL or string identifier for the image
  }
  

export async function POST(req: NextRequest, res: NextResponse) {
    console.log("fucking post")
    const { buyerId, buyerName,buyerImage, vendorId, vendorName, vendorImage } = await req.json() as BuyerVendorData; // Extract buyerId and vendorId from the request body
    console.log(buyerName,"bname")
    console.log(buyerImage,"bImage")
    
    // Try to find an existing conversation between the buyer and vendor
    const existingConversation = await Conversation.findOne({
        $or: [
            { participant1: buyerId, participant2: vendorId },
            // { participant1: vendorId, participant2: buyerId },


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
            participant1Name:buyerName,
            participant1Image:buyerImage,
            participant2: vendorId,
            participant2Name: vendorName, // The name of the vendor
            participant2Image: vendorImage, // The image of the vendor
            createdAt: new Date()
        });
        conversationId = newConversation._id;
    }

    return NextResponse.json({ conversationId }); // Return the conversationId in the response
}

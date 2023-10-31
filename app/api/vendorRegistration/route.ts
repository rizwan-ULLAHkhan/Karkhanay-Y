import clientPromise from '../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';

interface VendorRegistrationRequestBody {
    gmail:string,
    fullName: string;
    companyName: string;
    contactNumber: string;
    industryType: string;
    city: string;
    address: string;
    email: string;
    
}

export async function POST(req: NextRequest, res: NextResponse) {
    console.log("POST function accessed for Vendor");
    const data = await req.json();

    const { gmail, fullName, companyName, contactNumber, industryType, city, address, email } = data as VendorRegistrationRequestBody;


    const client = await clientPromise;
    const db = client.db('Karkhanay');

    // Category logic
    const vendorDataCollection = db.collection('VendorData-collection');


    const newVendor = {
        gmail,
        fullName,
        companyName,
        contactNumber,
        industryType,
        city,
        address,
        email,
        createdAt: new Date(), 
    };


    let insertedvendorDataId;

    try {
        const result = await vendorDataCollection.insertOne(newVendor);
        insertedvendorDataId = result.insertedId;
    } catch (error) {
        console.error("MongoDB Error when inserting vendor data:", (error as Error).message, (error as Error).stack);
        return NextResponse.json({ message: 'Failed to create vendor data', error: (error as Error).message });
    }

    

    return NextResponse.json({ message: 'Vendor data created successfully!' });
}


import clientPromise from '../../../lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';

interface VendorRegistrationRequestBody {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    cnic: string;
    cnicFrontImageUrl:string;
    cnicBackImageUrl:string;
    password:string,
    confirmPassword:string,
    companyName: string;
    storeName: string;
    streetAddress: string;
    city: string;
    province: string;
    nationalTaxNumber: string;
    secpNumber: string;
  }
  

export async function POST(req: NextRequest, res: NextResponse) {
    console.log("POST function accessed for Vendor");
    const data = await req.json();

    const { 
        email, 
        firstName, 
        lastName, 
        phone, 
        cnic, 
        cnicFrontImageUrl,
        cnicBackImageUrl,
        password,
        confirmPassword,
        companyName, 
        storeName, 
        streetAddress, 
        city, 
        province, 
        nationalTaxNumber, 
        secpNumber 
      } = data as VendorRegistrationRequestBody;
      


    const client = await clientPromise;
    const db = client.db('Karkhanay');

    // Category logic
    const vendorDataCollection = db.collection('VendorData-collection');


    const newVendor = {
        email: email, 
        firstName: firstName, 
        lastName: lastName, 
        phone: phone, 
        cnic: cnic, 
        cnicFrontImageUrl:cnicFrontImageUrl,
        cnicBackImageUrl:cnicBackImageUrl,
        password:password,
        confirmPassword:confirmPassword,
        companyName: companyName, 
        storeName: storeName, 
        streetAddress: streetAddress, 
        city: city, 
        province: province, 
        nationalTaxNumber: nationalTaxNumber, 
        secpNumber: secpNumber,
        createdAt: new Date(), // Timestamp for when this record is created
      };
      


    let insertedvendorDataId;

    try {
        const result = await vendorDataCollection.insertOne(newVendor);
        insertedvendorDataId = result.insertedId;
    } catch (error) {
        console.error("MongoDB Error when inserting vendor data:", (error as Error).message, (error as Error).stack);
        return NextResponse.json({ message: 'Failed to create vendor data', error: (error as Error).message });
    }

    
    console.log("vendor ka data upload hogya")
    return NextResponse.json({ message: 'Vendor data created successfully!' });
}


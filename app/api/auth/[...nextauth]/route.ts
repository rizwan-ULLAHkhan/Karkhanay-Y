import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '../../../../lib/mongodb'
import { NextApiHandler } from 'next'




const handler = NextAuth({
  providers:[
    GoogleProvider({
        clientId:process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
        allowDangerousEmailAccountLinking: true,
    })
  ],

  callbacks: {
    async session({ session, user }) {
      // Get the MongoDB client
      const client = await clientPromise;
      // Get the database instance from the MongoDB client
      const db = client.db();
  
      // Fetch the user from the database using a unique identifier (e.g., email)
      const dbUser = await db.collection("users").findOne({ email: session.user.email });
      
      if (dbUser) {
        // Assign the MongoDB _id (converted to a string) to the session's user ID
        session.user.id = dbUser._id.toString();
      } else {
        // If the user is not found in the database, handle accordingly
        console.log("User not found in the database");
      }
      
      console.log(session.user, "Session user with ID");
      
      return session;
    },
    // ... other callbacks ...
  },
  


  adapter: MongoDBAdapter(clientPromise),
})

export { handler as GET, handler as POST }
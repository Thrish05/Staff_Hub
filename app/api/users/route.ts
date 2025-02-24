import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; 
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const db = client.db("Staff_Details");
    const users = await db.collection("Projects").find({}).toArray();
    
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}

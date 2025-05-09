import dbConnect from '../../../lib/db';
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  try {
    await dbConnect();
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const directors = await db.collection('directors').find({}).toArray();
    
    client.close();
    
    res.status(200).json(directors);
  } catch (error) {
    console.error('Error fetching directors:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
} 
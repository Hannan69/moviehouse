import dbConnect from '../../../lib/db';
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  try {
    // Connect to the database which will automatically seed if empty
    await dbConnect();
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    console.log('Fetching movies from database...');
    const movies = await db.collection('movies').find({}).toArray();
    console.log(`Found ${movies.length} movies in the database`);
    
    client.close();
    
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
} 
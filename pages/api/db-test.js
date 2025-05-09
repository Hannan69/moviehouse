import dbConnect from '../../lib/db';
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  try {
    // Test the dbConnect function
    await dbConnect();
    
    // Attempt to connect directly with MongoClient
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      return res.status(500).json({ 
        error: true,
        message: 'MONGODB_URI environment variable is not set',
        connected: false
      });
    }
    
    try {
      const client = await MongoClient.connect(uri, { 
        serverSelectionTimeoutMS: 5000 // 5 second timeout
      });
      const db = client.db();
      
      // Check if we can access the collections
      const collections = await db.listCollections().toArray();
      const collectionNames = collections.map(c => c.name);
      
      await client.close();
      
      return res.status(200).json({
        error: false,
        message: 'Successfully connected to MongoDB',
        connected: true,
        collections: collectionNames
      });
    } catch (mongoError) {
      return res.status(500).json({
        error: true,
        message: `MongoDB connection error: ${mongoError.message}`,
        connected: false
      });
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({
      error: true,
      message: `Database connection error: ${error.message}`,
      connected: false
    });
  }
} 
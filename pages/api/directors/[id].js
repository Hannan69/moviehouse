import dbConnect from '../../../lib/db';
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await dbConnect();
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    // Try to find using ObjectId first (for MongoDB _id)
    let director;
    try {
      // Check if id is a valid ObjectId
      if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
        director = await db.collection('directors').findOne({ _id: new ObjectId(id) });
      }
      
      // If not found, try string id
      if (!director) {
        director = await db.collection('directors').findOne({ id: id });
      }
    } catch (e) {
      // If error, fallback to string id search
      director = await db.collection('directors').findOne({ id: id });
    }

    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }

    // Find all movies by this director
    let movies = [];
    try {
      movies = await db.collection('movies').find({ directorId: id }).toArray();
    } catch (error) {
      console.error('Error fetching director movies:', error);
    }
    
    client.close();

    // Combine director details with their movies
    const result = {
      ...director,
      movies: movies
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching director details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
} 
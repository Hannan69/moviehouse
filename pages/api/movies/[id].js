import dbConnect from '../../../lib/db';
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await dbConnect();
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    // Try to find the movie
    let movie;
    
    try {
      // Check if id is a valid ObjectId
      if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
        movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });
      }
      
      // If not found, try with string id
      if (!movie) {
        movie = await db.collection('movies').findOne({ id: id });
      }
    } catch (e) {
      // If error, fallback to string id search
      movie = await db.collection('movies').findOne({ id: id });
    }
    
    client.close();

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
} 
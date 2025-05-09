import dbConnect from '../../../../lib/db';
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await dbConnect();
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    // Try to find genre and then get its movies
    let genre;
    let movies = [];
    
    try {
      // Check if id is a valid ObjectId
      if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
        genre = await db.collection('genres').findOne({ _id: new ObjectId(id) });
      }
      
      // If not found, try with string id
      if (!genre) {
        genre = await db.collection('genres').findOne({ id: id });
      }
      
      // Find movies matching this genre id (using string id)
      movies = await db.collection('movies').find({ genreId: id }).toArray();
    } catch (e) {
      // If error, try a direct search on the genreId field
      movies = await db.collection('movies').find({ genreId: id }).toArray();
    }
    
    client.close();

    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
} 
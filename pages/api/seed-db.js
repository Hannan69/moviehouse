import dbConnect from '../../lib/db';
import { MongoClient } from 'mongodb';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed. Use POST' });
  }

  try {
    await dbConnect();
    
    // Read data from data.json
    const filePath = path.join(process.cwd(), 'data.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const { movies, genres, directors } = JSON.parse(fileData);
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    // Clear existing collections
    await db.collection('movies').deleteMany({});
    await db.collection('genres').deleteMany({});
    await db.collection('directors').deleteMany({});
    
    // Insert data without converting the IDs to ObjectIds
    if (movies && movies.length > 0) {
      await db.collection('movies').insertMany(movies);
    }
    
    if (genres && genres.length > 0) {
      await db.collection('genres').insertMany(genres);
    }
    
    if (directors && directors.length > 0) {
      await db.collection('directors').insertMany(directors);
    }
    
    client.close();
    
    res.status(200).json({ 
      success: true, 
      message: 'Database seeded successfully',
      counts: {
        movies: movies.length,
        genres: genres.length,
        directors: directors.length
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error seeding database', 
      error: error.message 
    });
  }
} 
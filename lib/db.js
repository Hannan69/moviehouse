import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import path from 'path';
import fs from 'fs';

// Function to check if collections are empty and seed if needed
async function seedIfEmpty() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    
    // Check if collections are empty
    const moviesCount = await db.collection('movies').countDocuments();
    const genresCount = await db.collection('genres').countDocuments();
    const directorsCount = await db.collection('directors').countDocuments();
    
    // If any collection is empty, seed with data from data.json
    if (moviesCount === 0 || genresCount === 0 || directorsCount === 0) {
      console.log('Collections empty, seeding database...');
      
      // Read data from data.json
      const filePath = path.join(process.cwd(), 'data.json');
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const { movies, genres, directors } = JSON.parse(fileData);
      
      // Insert data if collections are empty
      if (moviesCount === 0 && movies && movies.length > 0) {
        await db.collection('movies').insertMany(movies);
      }
      
      if (genresCount === 0 && genres && genres.length > 0) {
        await db.collection('genres').insertMany(genres);
      }
      
      if (directorsCount === 0 && directors && directors.length > 0) {
        await db.collection('directors').insertMany(directors);
      }
      
      console.log('Database seeded successfully');
    } else {
      console.log('Collections already contain data, skipping seed');
    }
    
    await client.close();
    return true;
  } catch (error) {
    console.error('Error checking/seeding database:', error);
    return false;
  }
}

export default async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    
    // After successful connection, check if we need to seed
    await seedIfEmpty();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

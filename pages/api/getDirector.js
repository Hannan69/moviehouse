// File: pages/api/getDirector.js

import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(),'data.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData);

   
    if (!jsonData.directors || !Array.isArray(jsonData.directors)) {
      return res.status(400).json({ message: 'Invalid data format: directors not found' });
    }

    const directors = jsonData.directors;

    res.status(200).json(directors);
  } catch (error) {
    console.error('Error reading directors:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

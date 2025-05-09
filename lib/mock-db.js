import path from 'path';
import fs from 'fs';

export function getDataFromJson() {
  try {
    const filePath = path.join(process.cwd(), 'data.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data.json:', error);
    return { movies: [], genres: [], directors: [] };
  }
}

export function getAllMovies() {
  const data = getDataFromJson();
  return data.movies.map(movie => ({
    ...movie,
    _id: movie.id // Add _id field to match MongoDB format
  }));
}

export function getMovieById(id) {
  const data = getDataFromJson();
  const movie = data.movies.find(m => m.id === id);
  if (!movie) return null;
  
  return {
    ...movie,
    _id: movie.id
  };
}

export function getAllGenres() {
  const data = getDataFromJson();
  return data.genres.map(genre => ({
    ...genre,
    _id: genre.id
  }));
}

export function getGenreById(id) {
  const data = getDataFromJson();
  const genre = data.genres.find(g => g.id === id);
  if (!genre) return null;
  
  return {
    ...genre,
    _id: genre.id
  };
}

export function getMoviesByGenreId(genreId) {
  const data = getDataFromJson();
  return data.movies
    .filter(movie => movie.genreId === genreId)
    .map(movie => ({
      ...movie,
      _id: movie.id
    }));
}

export function getAllDirectors() {
  const data = getDataFromJson();
  return data.directors.map(director => ({
    ...director,
    _id: director.id
  }));
}

export function getDirectorById(id) {
  const data = getDataFromJson();
  const director = data.directors.find(d => d.id === id);
  if (!director) return null;
  
  // Get movies directed by this director
  const movies = data.movies
    .filter(m => m.directorId === id)
    .map(movie => ({
      ...movie,
      _id: movie.id
    }));
  
  return {
    ...director,
    _id: director.id,
    movies
  };
} 
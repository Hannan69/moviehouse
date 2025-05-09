export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Fetch all movies
export const getMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/api/movies`);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// Fetch a single movie by ID
export const getMovieById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/movies/${id}`);
    if (!response.ok) throw new Error('Failed to fetch movie');
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
};

// Fetch all genres
export const getGenres = async () => {
  try {
    const response = await fetch(`${API_URL}/api/genres`);
    if (!response.ok) throw new Error('Failed to fetch genres');
    return await response.json();
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

// Fetch movies by genre ID
export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await fetch(`${API_URL}/api/genres/${genreId}/movies`);
    if (!response.ok) throw new Error('Failed to fetch movies by genre');
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
};

// Fetch all directors
export const getDirectors = async () => {
  try {
    const response = await fetch(`${API_URL}/api/directors`);
    if (!response.ok) throw new Error('Failed to fetch directors');
    return await response.json();
  } catch (error) {
    console.error('Error fetching directors:', error);
    return [];
  }
};

// Fetch a director by ID
export const getDirectorById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/directors/${id}`);
    if (!response.ok) throw new Error('Failed to fetch director');
    return await response.json();
  } catch (error) {
    console.error('Error fetching director:', error);
    return null;
  }
};
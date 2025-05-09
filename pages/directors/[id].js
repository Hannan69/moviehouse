import { getDirectorById } from '@/lib/helper';
import Link from 'next/link';

export default function DirectorDetail({ director, directedMovies }) {
  if (!director) return <div>Loading...</div>;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold underline decoration-red-500 mb-4">
          Director Details
      </h1>
      <p className="text-xl">
          <span className="font-semibold">Name:</span> {director.name}
      </p>
      <p className="text-xl underline decoration-red-200">
          <span className="font-semibold">Biography:</span> {director.biography}
      </p>
      <p className="text-xl font-semibold mb-4 my-10">
          <span className="border-b-2 border-red-500 ">Movies Directed</span>
      </p>
      <ul className="space-y-1 justify-center items-center">
          {directedMovies.map((movie) => (
              <li key={movie.id || movie._id} className="transition-all duration-200 hover:bg-gray-800 rounded-lg p-2">
                  <Link href={`/movies/${movie.id || movie._id}`} className="text-xl font-medium text-white hover:text-red-500">
                      {movie.title}
                  </Link>
              </li>
          ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;

  try {
    const directorResponse = await getDirectorById(id);
    if (!directorResponse) {
      return { notFound: true };
    }

    const director = {
      id: directorResponse._id || directorResponse.id,
      name: directorResponse.name,
      biography: directorResponse.biography
    };

    const directedMovies = directorResponse.movies?.map(movie => ({
      ...movie,
      id: movie._id || movie.id
    })) || [];

    return {
      props: { director, directedMovies }
    };
  } catch (error) {
    console.error('Error fetching director details:', error);
    return {
      props: { director: null, directedMovies: [] }
    };
  }
} 
import { getMoviesData } from '@/lib/helper'
import Link from 'next/link'
export default function GenresPage({ genres, filteredMovies }) {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 border-b-2 border-red-500 inline-block">Genres</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {genres.map((genre) => (
          <a
            key={genre.id}
            href={`/genres?genre=${genre.id}`}
            className="bg-gray-800 hover:bg-red-600 transition-colors p-4 rounded-lg text-center font-medium"
          >
            {genre.name}
          </a>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Movies</h2>
      <ul className="space-y-3">
        {filteredMovies.map((movie) => (
          <li key={movie.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition">
            <Link href={`/movies/${movie.id}`}>
            <p className="text-xl font-semibold">{movie.title}</p>
            <p className="text-sm text-gray-300">{movie.releaseYear}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps(context) {
    const { query } = context
    const selectedGenreId = query.genre
  
    const data = getMoviesData()
    const genres = data.genres
    const allMovies = data.movies
  
    
    let filteredMovies;
    if(selectedGenreId){
        filteredMovies=allMovies.filter((m)=>m.genreId===selectedGenreId)
    }else{
        filteredMovies = allMovies
    }
  
    return {
      props: {
        genres,
        filteredMovies,
      },
    }
  }
  







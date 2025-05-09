import { getMovies, getDirectors, getGenres } from "@/lib/helper"
import Link from "next/link";

export async function getServerSideProps() {
    const movies = await getMovies();
    const directors = await getDirectors();
    const genres = await getGenres();
    
    // Enhance movies with director and genre info
    const enhancedMovies = movies.map((movie) => ({
        ...movie,
        id: movie._id || movie.id,
        director: directors.find((d) => d._id === movie.directorId || d.id === movie.directorId),
        genre: genres.find((g) => g._id === movie.genreId || g.id === movie.genreId)
    }));
    
    return {
        props: { movies: enhancedMovies }
    }
}

export default function Movies({ movies }) {
    return( 
        <>
        <h1 className='mx-5 my-5 font-semibold text-2xl underline'>All Movies </h1>
        <div className="flex flex-wrap">
        {movies.map((movie) => (
            <div key={movie.id} className='flex items-center justify-center my-5 mx-5 w-64 h-40 border-black rounded-lg shaodw-lg bg-black underline decoration-red-500'>
                <Link href={`/movies/${movie.id}`} className='font-semibold text-white text-center'>{movie.title}</Link>   
            </div>
        ))}
        </div>
        </>
    )
}
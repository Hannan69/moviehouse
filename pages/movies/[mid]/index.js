import { getMovieById, getDirectorById, getMovies, getGenres } from '@/lib/helper'
import Link from 'next/link'

export default function MovieDetail({ movie }) {
    if (!movie) return <div>Loading...</div>;
    
    return(
        <div className="flex flex-col bg-black justify-center items-center py-5 mx-auto my-10 max-w-xl h-auto border border-gray-700 rounded-lg shadow-lg">
            <h1 className="text-white font-semibold text-2xl underline decoration-red-500 mb-4 text-center">
                {movie.title}
            </h1>
            <h2 className="text-red-500 font-extrabold text-lg mb-2">Description</h2>
            <p className="text-white font-medium text-center px-4 mb-6">
                {movie.description}
            </p>
            <div className="flex justify-between w-full px-6">
                {/* Left Column */}
                <div className="text-white">
                    <p className="font-semibold mb-2">
                        Director: <Link href={`/movies/${movie.id}/director`} className="font-normal hover:underline">
                            {movie.director?.name || 'Unknown'}
                        </Link>
                    </p>
                    <p className="font-semibold">
                        Genre: <span className="font-normal">{movie.genre?.name || 'Unknown'}</span>
                    </p>
                </div>
                {/* Right Column */}
                <div className="text-white text-right">
                    <p className="font-semibold mb-2">Rating: <span className="font-normal">{movie.rating}</span></p>
                    <p className="font-semibold">Release Year: <span className="font-normal">{movie.releaseYear}</span></p>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const id = params.mid;

    try {
        const movie = await getMovieById(id);
        if (!movie) {
            return { notFound: true };
        }

        const director = await getDirectorById(movie.directorId);
        const genres = await getGenres();
        const genre = genres.find(g => g._id === movie.genreId || g.id === movie.genreId);

        const movieDetails = {
            ...movie,
            id: movie._id || movie.id,
            director,
            genre,
        };

        return {
            props: { movie: movieDetails }
        };
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return {
            props: { movie: null }
        };
    }
}
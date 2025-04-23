import { getMoviesData } from '@/lib/helper'
import Link from 'next/link'
export default function MovieDetail({movie}){
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
      <p className="font-semibold mb-2">Director: <Link href={`/movies/${movie.id}/director`}className="font-normal hover:underline ">{movie.director.name}</Link></p>
      <p className="font-semibold">Genre: <span className="font-normal">{movie.genre.name}</span></p>
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
export async function getStaticProps(context){
    const {params} = context
    const id = params.mid

    const data = getMoviesData()
    const movie = data.movies.find((m) => m.id === id)
    const director = data.directors.find((d) => d.id === movie.directorId)
    const genre = data.genres.find((g) => g.id === movie.genreId)
    const movieDetails = {
        ...movie,
        director,
        genre,
    }
    return{
        props:{movie : movieDetails}
    }
}

export async function getStaticPaths(){
    const data = getMoviesData()
    const paths = data.movies.map((movie)=>({
        params:{mid:movie.id}
    }))
    return{
        paths,
        fallback:'blocking'
    }
}
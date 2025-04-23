import { getMoviesData } from "@/lib/helper"
import Link from "next/link";
export async function getStaticProps(){
    const data = getMoviesData()
    const movies = data.movies.map((movie)=>({
        ...movie,
        director: movie.directorId,
        genre:movie.genreId
    }));
    return{
        props:{movies}
    }
}
export default function Movies ({movies}){

return( 
    <>
    <h1 className='mx-5 my-5 font-semibold text-2xl underline'>All Movies </h1>
    <div className="flex">
    {movies.map((movie)=>( <div className='flex items-center justify-center my-5 mx-5 w-64 h-40  border-black rounded-lg shaodw-lg bg-black underline decoration-red-500'>
         <Link href={`/movies/${movie.id}`} className=' font-semibold text-white text-center' >{movie.title}</Link>   
        </div>))}
        </div>
    </>
)
}
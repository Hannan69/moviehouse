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
export default function Home ({movies}){

return( 
    <>
    <h1 className='mx-5 my-5 font-semibold text-2xl text-center underline'>🔥Trending Movies🔥</h1>
    <div className="flex">
    {movies
    .filter((movie)=>movie.rating > 8)
    .map((movie)=>( <div className='flex items-center justify-center mx-auto w-64 h-40  border-black rounded-lg shaodw-lg bg-black underline decoration-red-500'>
         <Link href={`/movies/${movie.id}`} className=' font-semibold text-white text-center' >{movie.title}</Link>   
        </div>))}
        </div>
    </>
)
}
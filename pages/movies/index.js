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
    <h1 className='mx-5 my-5 font-semibold text-2xl'>Trending Movies</h1>
    <div className='my-5 mx-5 flex w-64 h-40  border-black rounded-lg shaodw-lg bg-gray-800'>
        <Link href=''></Link>
    </div>
    </>
)
}
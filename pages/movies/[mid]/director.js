import { getMoviesData } from "@/lib/helper"
export default function Director({ director, directedMovies }) {
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
    <li key={movie.id} className="transition-all duration-200 hover:bg-gray-800 rounded-lg p-2">
      <a
        href={`/movies/${movie.id}`}
        className="text-xl font-medium text-white hover:text-red-500"
      >
        {movie.title}
      </a>
    </li>
  ))}
</ul>

      </div>
    );
  }
export async function getStaticProps(context){
    const {params} = context
    const mid=params.mid

    const data = getMoviesData()
    const movie =data.movies.find((m)=> m.id===mid)

    const director = data.directors.find((d)=>d.id === movie.directorId)
    const directedMovies = data.movies.filter((m) => m.directorId === director.id)
    return{
        props:{director, directedMovies}
    }
}

export async function getStaticPaths(){
    const data=getMoviesData()
    const paths = data.movies.map((movie)=>({
        params: {mid:movie.id}
    }))
    return {
        paths,
        fallback: 'blocking'
    }
}
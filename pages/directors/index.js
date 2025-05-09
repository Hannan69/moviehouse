import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsList() {
  const { data, error, isLoading } = useSWR('/api/directors', fetcher);

  if (isLoading) return <p className="text-red-500 text-center mt-4">Loading...</p>;
  if (error) return <p className="text-red-600 text-center mt-4">Error loading directors.</p>;

  return (
    <div className="bg-black min-h-screen p-6">
      <h2 className="text-white text-3xl font-bold mb-6 text-center">Directors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((director) => (
          <div
            key={director._id || director.id}
            className="bg-red-900 p-4 rounded-lg shadow-lg hover:bg-red-800 transition duration-300"
          >
            <Link href={`/directors/${director._id || director.id}`}>
              <h3 className="text-black text-xl font-semibold mb-2">{director.name}</h3>
              <p className="text-gray-200">{director.biography}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

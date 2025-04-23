import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <nav className="w-full bg-black shadow-md px-10 py-2">
        <div className='flex items-center justify-between max-w-6xl mx-auto'>
            <Link href='/' className='text-2xl font-semibold text-red-500'>Movie House</Link>
            <div className="flex space-x-8">
                <Link href='/' className='text-red-500 hover:text-red-300 transition'>Home</Link>
                <Link href='/movies' className='text-red-500 hover:text-red-300 transition'>Movies</Link>
                <Link href='/genres' className='text-red-500 hover:text-red-300 transition'>Genres</Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
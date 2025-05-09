import React from 'react'
import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon } from 'lucide-react'
const Navbar = () => {
  const {darkMode,toggleTheme} = useTheme()
  return (
    <nav className="w-full bg-black shadow-md px-10 py-2">
        <div className='flex items-center justify-between max-w-6xl mx-auto'>
            <Link href='/' className='text-2xl font-semibold text-red-500'>Movie House</Link>
            <div className="flex space-x-8">
                <Link href='/' className='text-red-500 hover:text-red-300 transition'>Home</Link>
                <Link href='/movies' className='text-red-500 hover:text-red-300 transition'>Movies</Link>
                <Link href='/genres' className='text-red-500 hover:text-red-300 transition'>Genres</Link>
                <Link href='/directors' className='text-red-500 hover:text-red-300 transition'>Directors</Link>
                <Link href='/help' className='text-red-500 hover:text-red-300 transition'>Help</Link>
                <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-800 transition"
                aria-label="Toggle Dark Mode"
                >
                {darkMode ? <Sun className="w-5 h-5 text-red-500" /> : <Moon className="w-5 h-5 text-red-500" />}
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
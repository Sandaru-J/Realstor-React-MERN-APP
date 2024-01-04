import React from 'react'
import {FaSearch, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    if (currentUser) {
        // currentUser is truthy
        console.log('User is signed in.');
      } else {
        // currentUser is falsy
        console.log('User is not signed in.');
      }
  return (
    <header className=' bg-gray-800 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-2'>
            <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500'>Epic</span>
            <span className='font-semibold whitespace-nowrap dark:text-white'>States</span>
        </h1>
            </Link>
        <form className='bg-slate-600 p-2 rounded-lg flex items-center'>
            <input type='text' placeholder='search...' 
            className='bg-slate-600 focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-slate-500'/>
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
            <li className='italic  hidden sm:inline md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 hover:text-blue-200'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='italic  hidden sm:inline md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 hover:text-blue-200'>About</li>
            </Link>
            {/* <Link to='/sign-in' className='flex items-center'>
            <li className='md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 hover:text-blue-200'>Sign In</li>
            <FaArrowRight className='text-slate-600 ml-1 hover:text-blue-200'/>
            </Link> */}
            <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
        </div>
    </header>
  )
}


import React from 'react'
import { FaGithub } from 'react-icons/fa'

const Navbar = () => {
  return (
      <nav className='flex justify-around bg-transparent py-4 mt-1  items-center rounded-3xl'>
      <div className="  logo">
        <span className='font-bold text-3xl text-amber-300'>
          Taskup
        </span>
      </div>
      <ul className="flex gap-14 items-center justify-end text-white">
        <li className='hover:text-white/80 transition-all cursor-pointer font-bold sm:text-sm lg:text-xl '>Home </li>
        <li className='hover:text-white/80 transition-all cursor-pointer font-bold sm:text-sm lg:text-xl'>Your Tasks</li>
         <li><a  className='flex items-center justify-center gap-3 font-bold hover:scale-106 transition-transform' href="https://github.com/deepanshusaxena315/TaskUp-Task-Planner"> <FaGithub className='w-8 h-8 '/><div className='hidden md:flex'> Github</div></a></li>
      </ul>
    </nav>

  )
}

export default Navbar

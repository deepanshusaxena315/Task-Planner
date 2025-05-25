import React from 'react'

const Navbar = () => {
  return (
      <nav className='flex justify-around bg-gray-400  py-2 mt-1  items-center rounded-3xl'>
      <div className="  logo">
        <span className='font-bold text-2xl text-'>
          Listly
        </span>
      </div>
      <ul className="flex gap-10 mr-12">
        <li className='hover:font-bold transition-all cursor-pointer font-bold sm:text-sm lg:text-2xl '>Home </li>
        <li className='hover:font-bold transition-all cursor-pointer font-bold sm:text-sm lg:text-2xl'>Your Tasks</li>
      </ul>
    </nav>

  )
}

export default Navbar

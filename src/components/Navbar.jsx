import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-gray-500'>
      <div className=" mx-9 logo">
        <span className='font-bold text-2xl'>
          TaskRush
        </span>
      </div>
      <ul className="flex gap-6 mx-12">
        <li className='hover:font-bold transition-all cursor-pointer'>Home </li>
        <li className='hover:font-bold transition-all cursor-pointer'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar

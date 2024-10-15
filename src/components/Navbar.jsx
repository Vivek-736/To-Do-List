import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-indigo-900 text-white py-2'>
        <div className="logo">
            <div className="font-bold text-xl mx-8">iTask</div>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
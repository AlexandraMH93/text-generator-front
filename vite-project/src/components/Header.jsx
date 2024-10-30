import React from 'react'
import { Logout } from './Logout'

const Header = () => {
  return (
    <div className='border-b border-slate-100/10 flex items-center justify-between '>
      <div className='flex'>
        <h1 className='p-8 text-4xl font-extrabold drop-shadow-lg text-yellow-400'>GT</h1>
        <h1 className='p-8  text-2xl '>Generador de texto simulando IA</h1>
      </div>

      <Logout />

      </div>
    
  )
}

export default Header

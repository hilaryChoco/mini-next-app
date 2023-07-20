import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <div>
      <header  className="relative w-full h-auto flex justify-between md:justify-around items-center px-8 py-4 bg-blue-500 shadow-xl">
         <div className='font-bold text-neutral-50 tracking-wide text-5xl'>MKHC</div>
         <nav>
          <ul className="flex list-none md:space-x-12 w-full xl:text-lg text-sm">
            <li className="py-4">
              <Link legacyBehavior href="/">
                <a className="cursor-pointer p-2 rounded-lg text-left font-medium text-neutral-50 tracking-wide hover:bg-red-500 hover:text-white">Acceuil</a>
              </Link>
            </li>
            <li className="py-4">
              <Link legacyBehavior href="/blog/articles">
                <a className="cursor-pointer p-2 rounded-lg text-left font-medium text-neutral-50 tracking-wide hover:bg-red-500 hover:text-white">Blog</a>
              </Link>
            </li>
            <li className="py-4">
              <Link legacyBehavior href="/todo/list">
                <a className="cursor-pointer p-2 rounded-lg text-left font-medium text-neutral-50 tracking-wide hover:bg-red-500 hover:text-white">Todo</a>
              </Link>
            </li>
          </ul>
         </nav>
      </header>
    </div>
  )
}

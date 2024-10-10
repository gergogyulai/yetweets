import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">Ye Tweets</Link>
          <ul className="flex space-x-4">
            <li><Link href="/archive" className="hover:underline">Archive</Link></li>
            <li><Link href="/highlights" className="hover:underline">Highlights</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground py-4 mb-8">
    <div className="container mx-auto px-4">
      <ul className="flex justify-center space-x-6 md:space-x-12">
        <li><Link href="/" className="hover:underline">Index</Link></li>
        <li><Link href="/highlights" className="hover:underline">Highlights</Link></li>
        <li><Link href="/github" className="hover:underline">Github</Link></li>
        <li><Link href="/submit" className="hover:underline">Submit</Link></li>
      </ul>
    </div>
  </nav>
  )
}

export default Navbar

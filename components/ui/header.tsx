'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold text-primary">
            Xtraclinic
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Home
          </Link>
          <Link href="#" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            About
          </Link>
          <Link href="#" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Services
          </Link>
          <Link href="#" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Blog
          </Link>
          <Link href="#" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="bg-secondary hover:bg-opacity-90 text-secondary-foreground px-6 py-2 rounded-lg font-medium text-sm transition-all">
            Get Appointment
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-4">
            <Link href="#" className="block text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="#" className="block text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link href="#" className="block text-foreground hover:text-primary transition-colors font-medium">
              Services
            </Link>
            <Link href="#" className="block text-foreground hover:text-primary transition-colors font-medium">
              Blog
            </Link>
            <Link href="#" className="block text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
            <button className="w-full bg-secondary hover:bg-opacity-90 text-secondary-foreground px-6 py-2 rounded-lg font-medium transition-all">
              Get Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

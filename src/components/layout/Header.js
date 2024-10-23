import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'

import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto flex items-center justify-between px-6 py-3 h-24">
        <div className='flex items-center gap-10'>
          <select className='border py-3 px-16 rounded-lg bg-[#FAFAFB] text-[#9D9DAA]'>
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>

          <div className='flex items-center gap-3'>
            <span className='text-[#9D9DAA] text-sm'>gwg</span>
            <select className='text-xs'>
              <option>default</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex items-center">
            <div className="relative hidden md:block mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full"
              />
            </div>
            {user ? (
              <div className="flex items-center">
                <Avatar className="mr-2">
                  <AvatarImage src="/placeholder-user.png" alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-gray-700 mr-4">{user.name}</span>
                
              </div>
            ) : (
              <Link to="/login">
                <Button variant="secondary">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
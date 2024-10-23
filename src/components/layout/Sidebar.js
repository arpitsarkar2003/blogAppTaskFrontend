import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Captions, PieChart, MessageSquare, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Sidebar() {
  const location = useLocation()

  const { logout, isAuthenticated } = useAuth();

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <aside className="bg-white w-64 h-screen hidden md:flex flex-col shadow-xl">
      <div className="flex items-center justify-center h-24 border-b">
        <img src='/logo.svg' alt="Logo" />
      </div>

      {/* Main navigation */}
      <nav className="mt-6 flex-grow">
        <Link
          to="/"
          className="flex items-center py-4 px-10 hover:bg-purple-100 text-gray-600"
        >
          <Home className="mr-3 h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/"
          className={`flex items-center py-4 px-10 hover:bg-purple-100 ${isActive('/') ? 'text-gray-700 border-l-4 border-purple-600' : 'text-gray-600'
            }`}
        >
          <Captions className="mr-3 h-5 w-5 text-purple-600" />
          <span>Blogs</span>
        </Link>
        <a href="#" className="flex items-center py-4 px-10 hover:bg-purple-100 text-gray-600">
          <PieChart className="mr-3 h-5 w-5" />
          <span>Finances</span>
        </a>
        <a href="#" className="flex items-center py-4 px-10 hover:bg-purple-100 text-gray-600">
          <MessageSquare className="mr-3 h-5 w-5" />
          <span>Pitches</span>
        </a>
      </nav>

      {/* Bottom buttons */}
      {isAuthenticated ? (
        <div className="mt-auto">
          <a href="#" className="flex items-center py-4 px-10 hover:bg-purple-100 text-gray-600">
            <Settings className="mr-3 h-5 w-5" />
            <span>Settings</span>
          </a>

          <div onClick={logout} className="cursor-pointer flex items-center py-4 px-10 hover:bg-purple-100 text-gray-600">
            <LogOut className="mr-3 h-5 w-5" />
            <button variant="ghost">Logout</button>
          </div>
        </div>
      ) : ""}

    </aside>
  )
}

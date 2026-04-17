import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Clock, BookOpen, Gamepad2, Play, Settings } from 'lucide-react'

const Navigation: React.FC = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: Clock, label: 'Hem' },
    { path: '/learn', icon: BookOpen, label: 'Lär' },
    { path: '/practice', icon: Play, label: 'Öva' },
    { path: '/play', icon: Gamepad2, label: 'Spela' },
    { path: '/parent', icon: Settings, label: 'Förälder' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Clock className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">Klockan</span>
          </Link>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path || 
                              (item.path !== '/' && location.pathname.startsWith(item.path))
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700 font-bold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

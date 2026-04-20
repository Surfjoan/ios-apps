import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-6xl font-bold text-blue-600">404</div>
        <h1 className="text-2xl font-bold text-gray-800">
          Sidan kunde inte hittas
        </h1>
        <p className="text-gray-600">
          Oj! Den här sidan finns inte. Låt oss ta dig tillbaka till appen.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="btn-primary flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Hem</span>
          </Link>
          
          <Link
            to="/learn"
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tillbaka</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound

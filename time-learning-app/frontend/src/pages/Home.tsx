import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, Play, Gamepad2, Star } from 'lucide-react'

const Home: React.FC = () => {
  const modes = [
    {
      title: 'Lär',
      description: 'Lär dig känna igen klockan och förstå tid',
      icon: BookOpen,
      path: '/learn',
      color: 'bg-blue-500',
    },
    {
      title: 'Öva',
      description: 'Träna på olika tidsuppgifter',
      icon: Play,
      path: '/practice',
      color: 'bg-green-500',
    },
    {
      title: 'Spela',
      description: 'Lär dig med roliga spel och utmaningar',
      icon: Gamepad2,
      path: '/play',
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Lär dig läsa klockan!
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          En rolig och interaktiv app för att lära barn förstå tid. 
          Välj ett läge och börja din resa!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modes.map((mode, index) => {
          const Icon = mode.icon
          return (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={mode.path}
                className="block card hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`${mode.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{mode.title}</h2>
                <p className="text-gray-600">{mode.description}</p>
                <div className="mt-4 flex items-center text-indigo-600 font-semibold">
                  <span>Börja nu</span>
                  <Star className="w-5 h-5 ml-2" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card bg-gradient-to-r from-yellow-100 to-orange-100"
      >
        <div className="flex items-center space-x-4">
          <div className="text-4xl">🏆</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Din progression</h3>
            <p className="text-gray-600">Fortsätt öva för att låsa upp nya nivåer och samla stjärnor!</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Home

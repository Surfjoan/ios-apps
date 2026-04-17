import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Target, Zap } from 'lucide-react'

const games = [
  { id: 1, name: 'Tids-memory', description: 'Para ihop klockor med rätt tid', icon: Target, unlocked: true },
  { id: 2, name: 'Snabb-klockan', description: 'Svara så snabbt du kan!', icon: Zap, unlocked: true },
  { id: 3, name: 'Bygg dagen', description: 'Placera aktiviteter på rätt tid', icon: Trophy, unlocked: false },
]

const Play: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Spela och lär</h1>
        <p className="text-gray-600">Lär dig klockan med roliga spel!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game, index) => {
          const Icon = game.icon
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card text-center ${game.unlocked ? 'hover:shadow-xl cursor-pointer' : 'opacity-50'}`}
            >
              <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                game.unlocked ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                <Icon className={`w-10 h-10 ${game.unlocked ? 'text-purple-600' : 'text-gray-400'}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h3>
              <p className="text-gray-600">{game.description}</p>
              {game.unlocked ? (
                <button className="mt-4 btn-secondary w-full">
                  Spela nu!
                </button>
              ) : (
                <div className="mt-4 text-gray-400 font-semibold">
                  🔒 Lås upp vid nivå 5
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Play

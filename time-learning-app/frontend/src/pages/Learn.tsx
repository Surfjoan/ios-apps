import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, ChevronRight, Star, Lock } from 'lucide-react'

const levels = [
  { id: 1, name: 'Känn igen klockan', description: 'Lär dig vad en klocka är och dess delar', unlocked: true, stars: 3 },
  { id: 2, name: 'Timvisaren', description: 'Förstå den korta visaren', unlocked: true, stars: 2 },
  { id: 3, name: 'Minutvisaren', description: 'Förstå den långa visaren', unlocked: true, stars: 0 },
  { id: 4, name: 'Hel timme', description: 'Läs när klockan slår hel', unlocked: false, stars: 0 },
  { id: 5, name: 'Halv timme', description: 'Läs halv och halv över', unlocked: false, stars: 0 },
  { id: 6, name: 'Kvart över/i', description: 'Förstå kvart över och kvart i', unlocked: false, stars: 0 },
]

const Learn: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Lär dig klockan</h1>
        <p className="text-gray-600">Välj en nivå och börja lära dig!</p>
        {selectedLevel && (
          <p className="text-indigo-600 font-semibold">Vald nivå: {selectedLevel}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map((level, index) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`card ${
              level.unlocked ? 'cursor-pointer hover:shadow-xl' : 'opacity-70'
            } transition-all`}
            onClick={() => level.unlocked && setSelectedLevel(level.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  level.unlocked ? 'bg-indigo-100' : 'bg-gray-100'
                }`}>
                  {level.unlocked ? (
                    <Clock className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <Lock className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{level.name}</h3>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < level.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {level.unlocked && (
              <div className="mt-4 flex items-center text-indigo-600 font-semibold">
                <span>Starta lektion</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Learn

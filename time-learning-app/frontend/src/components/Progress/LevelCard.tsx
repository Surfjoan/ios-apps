import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Clock, ChevronRight } from 'lucide-react'
import Stars from './Stars'

interface LevelCardProps {
  id: number
  title: string
  description: string
  stars: number
  unlocked: boolean
  completed: boolean
  onClick?: () => void
}

const LevelCard: React.FC<LevelCardProps> = ({
  id,
  title,
  description,
  stars,
  unlocked,
  completed,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={unlocked ? { y: -5, shadow: "0 10px 25px rgba(0,0,0,0.15)" } : {}}
      className={`card ${
        unlocked ? 'cursor-pointer hover:shadow-xl' : 'opacity-70'
      } transition-all relative overflow-hidden`}
      onClick={unlocked ? onClick : undefined}
    >
      {/* Completion indicator */}
      {completed && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
          ✓
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            unlocked ? 'bg-indigo-100' : 'bg-gray-100'
          }`}>
            {unlocked ? (
              <Clock className="w-6 h-6 text-indigo-600" />
            ) : (
              <Lock className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        
        <Stars stars={stars} size="small" />
      </div>
      
      {unlocked && (
        <div className="mt-4 flex items-center text-indigo-600 font-semibold">
          <span>Starta nivå</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      )}
      
      {!unlocked && (
        <div className="mt-4 text-gray-400 text-sm font-semibold">
          🔒 Lås upp vid nivå {id - 1}
        </div>
      )}
    </motion.div>
  )
}

export default LevelCard

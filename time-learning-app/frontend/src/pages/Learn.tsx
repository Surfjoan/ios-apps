import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { LevelCard } from '../components/Progress'

const Learn: React.FC = () => {
  const navigate = useNavigate()
  const { progress, loading, getLevelProgress } = useProgress()
  
  const levels = [
    { id: 1, name: 'Känn igen klockan', description: 'Lär dig vad en klocka är och dess delar' },
    { id: 2, name: 'Timvisaren', description: 'Förstå den korta visaren' },
    { id: 3, name: 'Minutvisaren', description: 'Förstå den långa visaren' },
    { id: 4, name: 'Hel timme', description: 'Läs när klockan slår hel' },
    { id: 5, name: 'Halv timme', description: 'Läs halv och halv över' },
    { id: 6, name: 'Kvart över/i', description: 'Förstå kvart över och kvart i' },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Laddar...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Lär dig klockan</h1>
        <p className="text-gray-600">Välj en nivå och börja lära dig!</p>
        {progress && (
          <div className="flex justify-center items-center space-x-4 text-lg">
            <span className="text-yellow-500 font-semibold">⭐ {progress.totalStars} stjärnor</span>
            <span className="text-blue-600 font-semibold">Nivå {progress.currentLevel}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map((level, index) => {
          const levelProgress = getLevelProgress(level.id)
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <LevelCard
                id={level.id}
                title={level.name}
                description={level.description}
                stars={levelProgress?.stars || 0}
                unlocked={levelProgress?.unlocked || false}
                completed={levelProgress?.completed || false}
                onClick={() => {
                  if (levelProgress?.unlocked) {
                    // Navigate to exercise
                    if (level.id === 1) {
                      navigate('/exercises/introduction')
                    } else if (level.id === 2) {
                      navigate('/exercises/whole-hour')
                    } else if (level.id === 3) {
                      navigate('/exercises/half-hour')
                    } else if (level.id === 4) {
                      navigate('/exercises/analog-digital')
                    } else if (level.id === 5) {
                      navigate('/play/memory')
                    } else if (level.id === 6) {
                      navigate('/play/quicktime')
                    }
                  }
                }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Learn

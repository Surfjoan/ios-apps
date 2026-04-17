import React from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle } from 'lucide-react'

const exercises = [
  { id: 1, name: 'Peka på klockans delar', type: 'identification', difficulty: 'easy' },
  { id: 2, name: 'Dra visarna till rätt tid', type: 'interactive', difficulty: 'easy' },
  { id: 3, name: 'Välj rätt klocka', type: 'selection', difficulty: 'medium' },
  { id: 4, name: 'Läs analog tid', type: 'reading', difficulty: 'medium' },
  { id: 5, name: 'Digital till analog', type: 'conversion', difficulty: 'hard' },
]

const Practice: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Öva på tid</h1>
        <p className="text-gray-600">Välj en övning och träna!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercises.map((exercise, index) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="exercise-card"
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Clock className="w-7 h-7 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{exercise.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`level-badge level-${exercise.difficulty}`}>
                    {exercise.difficulty === 'easy' ? 'Lätt' : 
                     exercise.difficulty === 'medium' ? 'Medel' : 'Svårt'}
                  </span>
                </div>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Practice

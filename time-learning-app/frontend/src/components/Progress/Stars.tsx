import React from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface StarsProps {
  stars: number
  maxStars?: number
  size?: 'small' | 'medium' | 'large'
  interactive?: boolean
  onStarClick?: (starIndex: number) => void
}

const Stars: React.FC<StarsProps> = ({ 
  stars, 
  maxStars = 3, 
  size = 'medium',
  interactive = false,
  onStarClick 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  }

  return (
    <div className="flex space-x-1">
      {[...Array(maxStars)].map((_, index) => {
        const isFilled = index < stars
        const starNumber = index + 1

        return (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: isFilled ? 1 : 0.8, 
              rotate: isFilled ? 0 : -180 
            }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200
            }}
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            onClick={() => interactive && onStarClick?.(starNumber)}
            className={`${sizeClasses[size]} ${
              interactive ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <Star
              className={`w-full h-full transition-colors ${
                isFilled 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

export default Stars

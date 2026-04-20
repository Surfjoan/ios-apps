import { useState, useEffect } from 'react'

interface Progress {
  levelId: number
  stars: number
  completed: boolean
  unlocked: boolean
}

interface UserProgress {
  userId: string
  userName: string
  levels: Progress[]
  totalStars: number
  currentLevel: number
}

const STORAGE_KEY = 'time-learning-progress'

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)

  // Load progress from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setProgress(parsed)
      } else {
        // Initialize new user
        const newProgress: UserProgress = {
          userId: 'demo-user',
          userName: 'Barn',
          levels: [
            { levelId: 1, stars: 0, completed: false, unlocked: true },
            { levelId: 2, stars: 0, completed: false, unlocked: true },
            { levelId: 3, stars: 0, completed: false, unlocked: true },
            { levelId: 4, stars: 0, completed: false, unlocked: false },
            { levelId: 5, stars: 0, completed: false, unlocked: false },
            { levelId: 6, stars: 0, completed: false, unlocked: false },
            { levelId: 7, stars: 0, completed: false, unlocked: false },
            { levelId: 8, stars: 0, completed: false, unlocked: false },
            { levelId: 9, stars: 0, completed: false, unlocked: false }
          ],
          totalStars: 0,
          currentLevel: 1
        }
        setProgress(newProgress)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save progress to localStorage
  const saveProgress = (updatedProgress: UserProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress))
      setProgress(updatedProgress)
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }

  // Update level progress
  const updateLevelProgress = (levelId: number, stars: number, completed: boolean = false) => {
    if (!progress) return

    const updatedLevels = progress.levels.map(level => {
      if (level.levelId === levelId) {
        const newStars = Math.max(level.stars, stars)
        const newCompleted = level.completed || completed
        
        // Unlock next level if completed and not already unlocked
        const newUnlocked = level.unlocked || newCompleted
        
        return {
          ...level,
          stars: newStars,
          completed: newCompleted,
          unlocked: newUnlocked
        }
      }
      return level
    })

    // Unlock next level if current level was completed
    const completedLevel = updatedLevels.find(l => l.levelId === levelId)
    if (completedLevel?.completed) {
      const nextLevel = updatedLevels.find(l => l.levelId === levelId + 1)
      if (nextLevel && !nextLevel.unlocked) {
        nextLevel.unlocked = true
      }
    }

    const totalStars = updatedLevels.reduce((sum, level) => sum + level.stars, 0)
    const newProgress = {
      ...progress,
      levels: updatedLevels,
      totalStars,
      currentLevel: Math.max(progress.currentLevel, levelId)
    }

    saveProgress(newProgress)
    return newProgress
  }

  // Get level progress
  const getLevelProgress = (levelId: number) => {
    return progress?.levels.find(l => l.levelId === levelId) || null
  }

  // Reset all progress
  const resetProgress = () => {
    const newProgress: UserProgress = {
      userId: 'demo-user',
      userName: 'Barn',
      levels: [
        { levelId: 1, stars: 0, completed: false, unlocked: true },
        { levelId: 2, stars: 0, completed: false, unlocked: true },
        { levelId: 3, stars: 0, completed: false, unlocked: true },
        { levelId: 4, stars: 0, completed: false, unlocked: false },
        { levelId: 5, stars: 0, completed: false, unlocked: false },
        { levelId: 6, stars: 0, completed: false, unlocked: false },
        { levelId: 7, stars: 0, completed: false, unlocked: false },
        { levelId: 8, stars: 0, completed: false, unlocked: false },
        { levelId: 9, stars: 0, completed: false, unlocked: false }
      ],
      totalStars: 0,
      currentLevel: 1
    }
    saveProgress(newProgress)
  }

  return {
    progress,
    loading,
    updateLevelProgress,
    getLevelProgress,
    resetProgress,
    saveProgress
  }
}

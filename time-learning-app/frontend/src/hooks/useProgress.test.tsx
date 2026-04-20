import { renderHook, act } from '@testing-library/react'
import { useProgress } from './useProgress'

describe('useProgress Hook', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('provides required functions', () => {
    const { result } = renderHook(() => useProgress())
    
    expect(result.current.updateLevelProgress).toBeDefined()
    expect(result.current.getLevelProgress).toBeDefined()
    expect(result.current.resetProgress).toBeDefined()
    expect(result.current.saveProgress).toBeDefined()
  })

  it('initializes with loading state', () => {
    const { result } = renderHook(() => useProgress())
    
    expect(typeof result.current.loading).toBe('boolean')
    expect(typeof result.current.progress).toBe('object')
  })

  it('updates level progress correctly', () => {
    const { result } = renderHook(() => useProgress())
    
    act(() => {
      result.current.updateLevelProgress(1, 3, true)
    })

    const level1 = result.current.progress?.levels.find(l => l.levelId === 1)
    expect(level1?.stars).toBe(3)
    expect(level1?.completed).toBe(true)
    expect(level1?.unlocked).toBe(true)
  })

  it('unlocks next level when completing current level', () => {
    const { result } = renderHook(() => useProgress())
    
    act(() => {
      result.current.updateLevelProgress(1, 3, true)
    })

    const level2 = result.current.progress?.levels.find(l => l.levelId === 2)
    expect(level2?.unlocked).toBe(true)
  })

  it('keeps maximum stars when updating with lower value', () => {
    const { result } = renderHook(() => useProgress())
    
    // First set some stars
    act(() => {
      result.current.updateLevelProgress(1, 3, true)
    })
    
    // Then update with lower value
    act(() => {
      result.current.updateLevelProgress(1, 1, false)
    })

    const level1 = result.current.progress?.levels.find(l => l.levelId === 1)
    expect(level1?.stars).toBe(3) // Should keep max stars
  })

  it('gets specific level progress', () => {
    const { result } = renderHook(() => useProgress())
    
    act(() => {
      result.current.updateLevelProgress(2, 4, true)
    })

    const levelProgress = result.current.getLevelProgress(2)
    expect(levelProgress).toEqual({
      levelId: 2,
      stars: 4,
      completed: true,
      unlocked: true
    })
  })

  it('returns null for non-existent level', () => {
    const { result } = renderHook(() => useProgress())
    
    const levelProgress = result.current.getLevelProgress(999)
    expect(levelProgress).toBe(null)
  })

  it('resets progress to default values', () => {
    const { result } = renderHook(() => useProgress())
    
    act(() => {
      result.current.resetProgress()
    })

    expect(result.current.progress?.totalStars).toBe(0)
    expect(result.current.progress?.levels[0].completed).toBe(false)
    expect(result.current.progress?.levels[0].stars).toBe(0)
  })

  it('handles localStorage errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    
    // Mock localStorage to throw error
    const originalGetItem = localStorage.getItem
    localStorage.getItem = jest.fn(() => {
      throw new Error('Storage error')
    })

    renderHook(() => useProgress())
    expect(consoleSpy).toHaveBeenCalledWith('Error loading progress:', expect.any(Error))
    
    // Restore
    localStorage.getItem = originalGetItem
    consoleSpy.mockRestore()
  })
})

// Mock API handlers for testing
export const mockApiResponse = (endpoint: string, data: any, status = 200) => {
  return {
    url: endpoint,
    method: 'GET',
    status,
    response: data
  }
}

export const mockHandlers = {
  // Health check endpoint
  health: mockApiResponse('/api/health', { 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  }),

  // Get user progress
  userProgress: mockApiResponse('/api/users/test-user/progress', {
    userId: 'test-user',
    userName: 'Test User',
    levels: [
      { levelId: 1, stars: 3, completed: true, unlocked: true },
      { levelId: 2, stars: 1, completed: false, unlocked: true },
      { levelId: 3, stars: 0, completed: false, unlocked: false }
    ],
    totalStars: 4,
    currentLevel: 2
  }),

  // Update user progress
  updateProgress: {
    url: '/api/users/test-user/progress',
    method: 'PUT',
    status: 200,
    response: {
      success: true,
      message: 'Progress updated successfully'
    }
  },

  // Get exercises by level
  exercises: mockApiResponse('/api/exercises', [
    {
      id: 1,
      title: 'Analog till Digital',
      description: 'Öva på att konvertera analog tid till digital tid',
      levelId: 1,
      type: 'analog-digital',
      difficulty: 'easy'
    },
    {
      id: 2,
      title: 'Hel Timme',
      description: 'Lär dig att läsa av hela timmar på klockan',
      levelId: 1,
      type: 'whole-hour',
      difficulty: 'easy'
    },
    {
      id: 3,
      title: 'Halvtimme',
      description: 'Öva på att läsa av halvtimmar på klockan',
      levelId: 2,
      type: 'half-hour',
      difficulty: 'medium'
    }
  ]),

  // Create user
  createUser: {
    url: '/api/users',
    method: 'POST',
    status: 201,
    response: {
      userId: 'new-user-' + Date.now(),
      userName: 'New User',
      createdAt: new Date().toISOString()
    }
  },

  // Get user statistics
  userStats: mockApiResponse('/api/users/test-user/stats', {
    totalStars: 4,
    completedLevels: 1,
    currentStreak: 3,
    totalTimeSpent: 120,
    exercisesCompleted: 15,
    accuracy: 0.85
  })
}

// Simple fetch mock for integration tests
export const mockFetch = (url: string, options?: RequestInit) => {
  const handler = Object.values(mockHandlers).find(h => 
    h.url === url || (h.url.includes(':') && url.includes(h.url.split(':')[1]))
  )

  if (!handler) {
    return Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not found' })
    } as Response)
  }

  return Promise.resolve({
    ok: true,
    status: handler.status,
    json: () => Promise.resolve(handler.response)
  } as Response)
}

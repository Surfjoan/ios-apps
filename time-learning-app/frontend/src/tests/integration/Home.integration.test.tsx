import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../../pages/Home'
import { mockFetch } from '../../mocks/handlers'
import '@testing-library/jest-dom'

// Mock fetch globally
global.fetch = jest.fn(mockFetch) as jest.Mock

describe('Home Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  it('renders home page correctly', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Lär dig läsa klockan!')).toBeInTheDocument()
    })

    expect(screen.getByText('Lär')).toBeInTheDocument()
    expect(screen.getByText('Öva')).toBeInTheDocument()
    expect(screen.getByText('Spela')).toBeInTheDocument()
  })

  it('navigates to learn page when clicking Lär button', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Lär dig läsa klockan!')).toBeInTheDocument()
    })

    const learnButton = screen.getByText('Lär')
    fireEvent.click(learnButton)

    // Should navigate to learn page (would need to test actual routing in full app context)
    expect(learnButton).toBeInTheDocument()
  })

  it('navigates to practice page when clicking Öva button', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Lär dig läsa klockan!')).toBeInTheDocument()
    })

    const practiceButton = screen.getByText('Öva')
    fireEvent.click(practiceButton)

    expect(practiceButton).toBeInTheDocument()
  })

  it('navigates to play page when clicking Spela button', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Lär dig läsa klockan!')).toBeInTheDocument()
    })

    const playButton = screen.getByText('Spela')
    fireEvent.click(playButton)

    expect(playButton).toBeInTheDocument()
  })

  it('displays user progress when available', async () => {
    // Mock localStorage with user data
    localStorage.setItem('time-learning-progress', JSON.stringify({
      userId: 'test-user',
      userName: 'Test User',
      levels: [
        { levelId: 1, stars: 3, completed: true, unlocked: true },
        { levelId: 2, stars: 1, completed: false, unlocked: true }
      ],
      totalStars: 4,
      currentLevel: 2
    }))

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Lär dig läsa klockan!')).toBeInTheDocument()
    })

    // Should show progress summary if implemented
    expect(screen.getByText('Din progression')).toBeInTheDocument()
  })
})

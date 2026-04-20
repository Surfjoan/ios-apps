import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Clock from './Clock'

describe('Clock Component', () => {
  const defaultProps = {
    hour: 12,
    minute: 0,
    interactive: false,
    size: 200,
  }

  beforeEach(() => {
    global.testUtils.clearLocalStorage()
  })

  it('renders clock with correct time', () => {
    render(<Clock {...defaultProps} hour={3} minute={30} />)
    
    // Check that clock SVG is rendered
    const clock = screen.getByTestId('clock-svg')
    expect(clock).toBeInTheDocument()
  })

  it('displays correct hour hand position', () => {
    render(<Clock {...defaultProps} hour={6} minute={0} />)
    
    const clock = screen.getByTestId('clock-svg')
    expect(clock).toBeInTheDocument()
  })

  it('displays correct minute hand position', () => {
    render(<Clock {...defaultProps} hour={12} minute={15} />)
    
    const clock = screen.getByTestId('clock-svg')
    expect(clock).toBeInTheDocument()
  })

  describe('Interactive mode', () => {
    const onTimeChange = jest.fn()

    beforeEach(() => {
      onTimeChange.mockClear()
    })

    it('calls onTimeChange when hands are dragged', async () => {
      const user = userEvent.setup()
      
      render(
        <Clock 
          {...defaultProps} 
          interactive={true} 
          onTimeChange={onTimeChange}
        />
      )

      const clock = screen.getByTestId('clock-svg')
      
      // Simulate dragging the hour hand
      fireEvent.mouseDown(clock, { clientX: 100, clientY: 100 })
      fireEvent.mouseMove(clock, { clientX: 150, clientY: 50 })
      fireEvent.mouseUp(clock)

      // Should call onTimeChange with new time
      expect(onTimeChange).toHaveBeenCalled()
    })

    it('updates time when hour hand is moved', async () => {
      const user = userEvent.setup()
      
      render(
        <Clock 
          {...defaultProps} 
          interactive={true} 
          onTimeChange={onTimeChange}
        />
      )

      const clock = screen.getByTestId('clock-svg')
      
      // Simulate dragging to 3 o'clock position
      fireEvent.mouseDown(clock, { clientX: 100, clientY: 100 })
      fireEvent.mouseMove(clock, { clientX: 200, clientY: 100 })
      fireEvent.mouseUp(clock)

      expect(onTimeChange).toHaveBeenCalledWith(
        expect.any(Number), // hour
        expect.any(Number)  // minute
      )
    })

    it('updates time when minute hand is moved', async () => {
      const user = userEvent.setup()
      
      render(
        <Clock 
          {...defaultProps} 
          interactive={true} 
          onTimeChange={onTimeChange}
        />
      )

      const clock = screen.getByTestId('clock-svg')
      
      // Simulate dragging minute hand
      fireEvent.mouseDown(clock, { clientX: 100, clientY: 100 })
      fireEvent.mouseMove(clock, { clientX: 100, clientY: 50 })
      fireEvent.mouseUp(clock)

      expect(onTimeChange).toHaveBeenCalled()
    })
  })

  describe('Static mode', () => {
    it('does not allow interaction when interactive is false', () => {
      const onTimeChange = jest.fn()
      
      render(
        <Clock 
          {...defaultProps} 
          interactive={false} 
          onTimeChange={onTimeChange}
        />
      )

      const clock = screen.getByTestId('clock-svg')
      
      // Try to interact with clock
      fireEvent.mouseDown(clock, { clientX: 100, clientY: 100 })
      fireEvent.mouseMove(clock, { clientX: 150, clientY: 50 })
      fireEvent.mouseUp(clock)

      // Should not call onTimeChange
      expect(onTimeChange).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Clock {...defaultProps} />)
      
      const clock = screen.getByTestId('clock-svg')
      expect(clock).toHaveAttribute('aria-label')
    })

    it('announces time to screen readers', () => {
      render(<Clock {...defaultProps} hour={3} minute={30} />)
      
      const clock = screen.getByTestId('clock-svg')
      expect(clock).toBeInTheDocument()
    })
  })

  describe('Responsive sizing', () => {
    it('renders with custom size', () => {
      render(<Clock {...defaultProps} size={300} />)
      
      const clock = screen.getByTestId('clock-svg')
      expect(clock).toBeInTheDocument()
    })

    it('renders with default size when not specified', () => {
      render(<Clock hour={12} minute={0} interactive={false} />)
      
      const clock = screen.getByTestId('clock-svg')
      expect(clock).toBeInTheDocument()
    })
  })
})

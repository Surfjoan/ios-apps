import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ClockProps {
  hour?: number
  minute?: number
  interactive?: boolean
  onTimeChange?: (hour: number, minute: number) => void
  size?: number
}

const Clock: React.FC<ClockProps> = ({ 
  hour = 12, 
  minute = 0, 
  interactive = false,
  onTimeChange,
  size = 300 
}) => {
  const [isDragging, setIsDragging] = useState<'hour' | 'minute' | null>(null)
  const [currentHour, setCurrentHour] = useState(hour)
  const [currentMinute, setCurrentMinute] = useState(minute)
  const svgRef = useRef<SVGSVGElement>(null)

  const centerX = size / 2
  const centerY = size / 2
  const radius = size * 0.4

  // Calculate angles for hands
  const hourAngle = (currentHour % 12) * 30 + (currentMinute / 60) * 30
  const minuteAngle = currentMinute * 6

  // Convert mouse position to angle
  const getAngleFromMouse = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return 0
    
    const rect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - centerX
    const y = e.clientY - rect.top - centerY
    
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90
    if (angle < 0) angle += 360
    
    return angle
  }

  // Handle mouse down on clock hands
  const handleMouseDown = (handType: 'hour' | 'minute') => (e: React.MouseEvent) => {
    if (!interactive) return
    e.preventDefault()
    setIsDragging(handType)
  }

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging || !interactive) return
    
    const angle = getAngleFromMouse(e)
    
    if (isDragging === 'hour') {
      const newHour = Math.round(angle / 30) % 12
      setCurrentHour(newHour === 0 ? 12 : newHour)
    } else if (isDragging === 'minute') {
      const newMinute = Math.round(angle / 6) % 60
      setCurrentMinute(newMinute)
    }
  }

  // Handle mouse up
  const handleMouseUp = () => {
    if (isDragging && onTimeChange) {
      onTimeChange(currentHour, currentMinute)
    }
    setIsDragging(null)
  }

  // Add global mouse event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging && onTimeChange) {
        onTimeChange(currentHour, currentMinute)
      }
      setIsDragging(null)
    }

    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp)
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, currentHour, currentMinute, onTimeChange])

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-block"
    >
      <svg
        ref={svgRef}
        data-testid="clock-svg"
        width={size}
        height={size}
        className={`cursor-pointer ${interactive ? 'cursor-grab' : ''}`}
        viewBox={`0 0 ${size} ${size}`}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Clock face */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="white"
          stroke="#374151"
          strokeWidth="3"
        />
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180)
          const x1 = centerX + Math.cos(angle) * (radius - 10)
          const y1 = centerY + Math.sin(angle) * (radius - 10)
          const x2 = centerX + Math.cos(angle) * (radius - 20)
          const y2 = centerY + Math.sin(angle) * (radius - 20)
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#374151"
              strokeWidth={i % 3 === 0 ? "3" : "1"}
            />
          )
        })}

        {/* Numbers */}
        {[...Array(12)].map((_, i) => {
          const num = i === 0 ? 12 : i
          const angle = (i * 30 - 90) * (Math.PI / 180)
          const x = centerX + Math.cos(angle) * (radius - 35)
          const y = centerY + Math.sin(angle) * (radius - 35)
          
          return (
            <text
              key={i}
              x={x}
              y={y + 5}
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill="#374151"
            >
              {num}
            </text>
          )
        })}

        {/* Minute hand */}
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + Math.cos((minuteAngle - 90) * (Math.PI / 180)) * (radius - 15)}
          y2={centerY + Math.sin((minuteAngle - 90) * (Math.PI / 180)) * (radius - 15)}
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
          className={interactive && isDragging === 'minute' ? 'cursor-grabbing' : 'cursor-grab'}
          onMouseDown={handleMouseDown('minute')}
        />

        {/* Hour hand */}
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + Math.cos((hourAngle - 90) * (Math.PI / 180)) * (radius - 30)}
          y2={centerY + Math.sin((hourAngle - 90) * (Math.PI / 180)) * (radius - 30)}
          stroke="#1F2937"
          strokeWidth="5"
          strokeLinecap="round"
          className={interactive && isDragging === 'hour' ? 'cursor-grabbing' : 'cursor-grab'}
          onMouseDown={handleMouseDown('hour')}
        />

        {/* Center dot */}
        <circle
          cx={centerX}
          cy={centerY}
          r="8"
          fill="#374151"
        />
      </svg>
    </motion.div>
  )
}

export default Clock

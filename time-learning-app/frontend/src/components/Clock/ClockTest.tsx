import React from 'react'
import Clock from './Clock'

const ClockTest: React.FC = () => {
  const handleTimeChange = (hour: number, minute: number) => {
    console.log(`Time changed to ${hour}:${minute}`)
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Test Clock Component</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Static clock */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Static (3:15)</h3>
          <Clock hour={3} minute={15} size={200} />
        </div>
        
        {/* Interactive clock */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Interactive</h3>
          <Clock 
            hour={9} 
            minute={30} 
            interactive={true} 
            onTimeChange={handleTimeChange}
            size={200} 
          />
        </div>
        
        {/* Large clock */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Large (12:00)</h3>
          <Clock hour={12} minute={0} size={300} />
        </div>
      </div>
    </div>
  )
}

export default ClockTest

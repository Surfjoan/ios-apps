import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, RotateCcw, Trophy } from 'lucide-react'
import ClockComponent from '../../components/Clock'

interface Card {
  id: number
  time: string
  hour: number
  minute: number
  isFlipped: boolean
  isMatched: boolean
}

const Memory: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const times = [
      { time: '3:00', hour: 3, minute: 0 },
      { time: '7:30', hour: 7, minute: 30 },
      { time: '12:15', hour: 12, minute: 15 },
      { time: '5:45', hour: 5, minute: 45 },
      { time: '9:20', hour: 9, minute: 20 },
      { time: '2:50', hour: 2, minute: 50 },
      { time: '8:10', hour: 8, minute: 10 }
    ]

    const gameCards: Card[] = []
    times.forEach((time, index) => {
      // Create two cards for each time (analog + digital)
      gameCards.push({
        id: index * 2,
        time: time.time,
        hour: time.hour,
        minute: time.minute,
        isFlipped: false,
        isMatched: false
      })
      gameCards.push({
        id: index * 2 + 1,
        time: time.time,
        hour: time.hour,
        minute: time.minute,
        isFlipped: false,
        isMatched: false
      })
    })

    // Shuffle cards
    const shuffled = [...gameCards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setSelectedCards([])
    setMoves(0)
    setMatches(0)
    setGameComplete(false)
  }

  const handleCardClick = (cardId: number) => {
    if (isChecking || gameComplete) return
    
    const card = cards.find(c => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched) return

    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    )
    setCards(newCards)

    const newSelectedCards = [...selectedCards, cardId]
    setSelectedCards(newSelectedCards)

    if (newSelectedCards.length === 2) {
      setIsChecking(true)
      setTimeout(() => checkMatch(newSelectedCards), 1000)
    }
  }

  const checkMatch = (selectedIds: number[]) => {
    const [first, second] = selectedIds
    const firstCard = cards.find(c => c.id === first)
    const secondCard = cards.find(c => c.id === second)

    if (firstCard && secondCard && firstCard.time === secondCard.time) {
      // Match found!
      const newCards = cards.map(c => 
        c.id === first || c.id === second
          ? { ...c, isMatched: true }
          : c
      )
      setCards(newCards)
      setMatches(matches + 1)
      
      // Check if game is complete
      if (matches + 1 === cards.length / 2) {
        setGameComplete(true)
      }
    } else {
      // No match - flip cards back
      setTimeout(() => {
        const newCards = cards.map(c => 
          c.id === first || c.id === second
            ? { ...c, isFlipped: false }
            : c
        )
        setCards(newCards)
      }, 1000)
    }

    setSelectedCards([])
    setIsChecking(false)
  }

  const resetGame = () => {
    initializeGame()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Tids-memory</h1>
        <p className="text-lg text-gray-600">
          Hitta par med samma tid!
        </p>
        <div className="flex justify-center items-center space-x-8 text-lg">
          <span className="text-blue-600 font-semibold">Drag: {moves}</span>
          <span className="text-green-600 font-semibold">Par: {matches}/{cards.length / 2}</span>
        </div>
      </div>

      {/* Game board */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map((card) => {
                        const isMatch = card.isMatched
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotateY: card.isFlipped || isMatch ? 0 : 180
                }}
                transition={{ duration: 0.6 }}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square cursor-pointer ${
                  isMatch ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className="relative w-full h-full">
                  {/* Card back */}
                  {!card.isFlipped && !isMatch && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                  )}
                  
                  {/* Card front */}
                  {(card.isFlipped || isMatch) && (
                    <div className={`absolute inset-0 rounded-xl flex items-center justify-center border-2 ${
                      isMatch 
                        ? 'bg-green-100 border-green-300' 
                        : 'bg-white border-gray-300'
                    }`}>
                      <div className="text-center">
                        {/* Show analog clock for odd cards, digital for even */}
                        {card.id % 2 === 0 ? (
                          <div className="mb-2">
                            <ClockComponent
                              hour={card.hour}
                              minute={card.minute}
                              interactive={false}
                              size={60}
                            />
                          </div>
                        ) : (
                          <div className="text-2xl font-bold text-gray-800">
                            {card.time}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Match indicator */}
                  {isMatch && (
                    <div className="absolute top-2 right-2">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Game controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={resetGame}
          className="btn-secondary"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Nytt spel
        </button>
      </div>

      {/* Victory screen */}
      {gameComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Grattis! 🎉
              </h2>
              <div className="text-lg space-y-2">
                <p>Du vann!</p>
                <p className="text-green-600 font-semibold">
                  Drag: {moves}
                </p>
                <p className="text-blue-600 font-semibold">
                  Par: {matches}/{cards.length / 2}
                </p>
              </div>
              
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={() => window.history.back()}
                  className="btn-secondary"
                >
                  Tillbaka
                </button>
                <button
                  onClick={resetGame}
                  className="btn-primary"
                >
                  Spela igen
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Memory

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Timer } from 'lucide-react'
import ClockComponent from '../../components/Clock'

interface Question {
  id: number
  hour: number
  minute: number
  text: string
}

const QuickTime: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedHour, setSelectedHour] = useState<number | null>(null)
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)

  const questions: Question[] = [
    { id: 1, hour: 3, minute: 0, text: 'Vad är klockan?' },
    { id: 2, hour: 7, minute: 15, text: 'Vad är klockan?' },
    { id: 3, hour: 12, minute: 30, text: 'Vad är klockan?' },
    { id: 4, hour: 5, minute: 45, text: 'Vad är klockan?' },
    { id: 5, hour: 9, minute: 20, text: 'Vad är klockan?' },
    { id: 6, hour: 2, minute: 50, text: 'Vad är klockan?' },
    { id: 7, hour: 8, minute: 25, text: 'Vad är klockan?' },
    { id: 8, hour: 11, minute: 10, text: 'Vad är klockan?' },
    { id: 9, hour: 4, minute: 40, text: 'Vad är klockan?' },
    { id: 10, hour: 6, minute: 35, text: 'Vad är klockan?' }
  ]

  const question = questions[currentQuestion]

  // Timer effect
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [gameActive, timeLeft])

  const handleTimeChange = (hour: number, minute: number) => {
    setSelectedHour(hour)
    setSelectedMinute(minute)
  }

  const startGame = () => {
    setGameActive(true)
    setTimeLeft(30)
  }

  const checkAnswer = () => {
    if (selectedHour === null || selectedMinute === null) return
    
    setGameActive(false)
    setShowResult(true)
    
    const isCorrect = selectedHour === question.hour && selectedMinute === question.minute
    if (isCorrect) {
      setScore(score + Math.max(0, timeLeft)) // Bonus points for speed
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedHour(null)
      setSelectedMinute(null)
      setShowResult(false)
      setTimeLeft(30)
      setGameActive(false)
    }
  }

  
  const isCorrect = showResult && selectedHour === question.hour && selectedMinute === question.minute

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Snabb-klockan</h1>
        <p className="text-lg text-gray-600">
          Svara snabbt och korrekt!
        </p>
        
        {/* Timer */}
        <div className="flex justify-center items-center space-x-4 text-lg">
          <Timer className="w-6 h-6 text-blue-600" />
          <span className={`font-bold ${timeLeft <= 10 ? 'text-red-600' : timeLeft <= 20 ? 'text-yellow-600' : 'text-green-600'}`}>
            {timeLeft}s
          </span>
          <span className="text-gray-600">Poäng: {score}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive clock */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-center mb-6">
              {gameActive ? 'Hitta tiden snabbt!' : 'Dra visarna till rätt tid'}
            </h2>
            
            <div className="flex justify-center mb-6">
              <ClockComponent
                hour={selectedHour || 12}
                minute={selectedMinute || 0}
                interactive={true}
                onTimeChange={handleTimeChange}
                size={250}
              />
            </div>

            <div className="flex justify-center space-x-4">
              {!gameActive && (
                <button
                  onClick={startGame}
                  disabled={selectedHour === null || selectedMinute === null}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Starta timer
                </button>
              )}
              
              <button
                onClick={checkAnswer}
                disabled={selectedHour === null || selectedMinute === null || showResult || !gameActive}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Svara
              </button>
            </div>
          </div>

          {/* Result feedback */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-xl text-center ${
                isCorrect ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                {isCorrect ? (
                  <>
                    <div className="text-2xl">🎉</div>
                    <span className="text-xl font-bold text-green-800">Rätt!</span>
                  </>
                ) : (
                  <>
                    <div className="text-2xl">😅</div>
                    <span className="text-xl font-bold text-red-800">Fel!</span>
                  </>
                )}
              </div>
              
              {!isCorrect && (
                <p className="mt-3 text-red-700">
                  Rätt svar var {question.hour.toString().padStart(2, '0')}:{question.minute.toString().padStart(2, '0')}
                </p>
              )}

              {isCorrect && (
                <div className="mt-3 text-green-700">
                  <p className="font-semibold">Snabbt och korrekt!</p>
                  <p>Tid bonus: +{Math.max(0, timeLeft)} poäng</p>
                  <p>Totalt: {score + Math.max(0, timeLeft)} poäng</p>
                </div>
              )}

              {isCorrect && currentQuestion < questions.length - 1 && (
                <button
                  onClick={nextQuestion}
                  className="mt-4 btn-primary"
                >
                  Nästa fråga
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Question and target */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {question.text}
            </h2>
            
            {/* Target time */}
            <div className="flex justify-center mb-8">
              <ClockComponent
                hour={question.hour}
                minute={question.minute}
                interactive={false}
                size={200}
              />
            </div>

            {/* Speed indicator */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                ⚡ Hastighetsnivåer:
              </h3>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-green-100 rounded-lg text-center">
                  <p className="font-semibold text-green-800">Super snabb</p>
                  <p className="text-green-700">0-10s</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg text-center">
                  <p className="font-semibold text-yellow-800">Snabb</p>
                  <p className="text-yellow-700">10-20s</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg text-center">
                  <p className="font-semibold text-blue-800">Bra</p>
                  <p className="text-blue-700">20-30s</p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 p-4 bg-purple-50 rounded-xl">
              <h3 className="font-semibold text-purple-800 mb-2">💡 Tips</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Läs timvisaren först (den korta)</li>
                <li>• Läs sedan minutvisaren (den långa)</li>
                <li>• Försök vara exakt - varje sekund räknas!</li>
                <li>• Ju snabbare du svarar, desto mer poäng</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Progress summary */}
      {currentQuestion === questions.length - 1 && showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tidsmästare! 🏆
          </h2>
          <div className="text-lg space-y-2">
            <p>Du klarade alla {questions.length} frågor</p>
            <p className="text-green-600 font-semibold">
              Total poäng: {score}
            </p>
            <p className="text-orange-600">
              Genomsnitt: {Math.round(score / questions.length)} poäng/fråga
            </p>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="btn-secondary"
            >
              Tillbaka till spel
            </button>
            <button
              onClick={() => {
                setCurrentQuestion(0)
                setScore(0)
                setSelectedHour(null)
                setSelectedMinute(null)
                setShowResult(false)
                setTimeLeft(30)
                setGameActive(false)
              }}
              className="btn-primary"
            >
              Spela igen
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default QuickTime

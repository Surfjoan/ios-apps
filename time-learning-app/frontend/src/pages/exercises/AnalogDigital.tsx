import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, RotateCcw, Clock } from 'lucide-react'
import ClockComponent from '../../components/Clock'

interface Question {
  id: number
  hour: number
  minute: number
  text: string
}

const AnalogDigital: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedDigitalTime, setSelectedDigitalTime] = useState<string>('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const questions: Question[] = [
    { id: 1, hour: 3, minute: 0, text: 'Matcha tiden' },
    { id: 2, hour: 7, minute: 15, text: 'Matcha tiden' },
    { id: 3, hour: 12, minute: 30, text: 'Matcha tiden' },
    { id: 4, hour: 5, minute: 45, text: 'Matcha tiden' },
    { id: 5, hour: 9, minute: 20, text: 'Matcha tiden' },
    { id: 6, hour: 2, minute: 10, text: 'Matcha tiden' },
    { id: 7, hour: 8, minute: 50, text: 'Matcha tiden' },
    { id: 8, hour: 11, minute: 25, text: 'Matcha tiden' },
    { id: 9, hour: 4, minute: 40, text: 'Matcha tiden' },
    { id: 10, hour: 6, minute: 35, text: 'Matcha tiden' }
  ]

  const question = questions[currentQuestion]

  const digitalOptions = [
    `${question.hour.toString().padStart(2, '0')}:${question.minute.toString().padStart(2, '0')}`,
    `${((question.hour + 1) % 12 || 12).toString().padStart(2, '0')}:${question.minute.toString().padStart(2, '0')}`,
    `${((question.hour + 11) % 12 || 12).toString().padStart(2, '0')}:${question.minute.toString().padStart(2, '0')}`,
    `${((question.hour + 2) % 12 || 12).toString().padStart(2, '0')}:${question.minute.toString().padStart(2, '0')}`
  ]

  const checkAnswer = () => {
    if (!selectedDigitalTime) return
    
    setShowResult(true)
    setAttempts(attempts + 1)
    
    const isCorrect = selectedDigitalTime === `${question.hour.toString().padStart(2, '0')}:${question.minute.toString().padStart(2, '0')}`
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedDigitalTime('')
      setShowResult(false)
    }
  }

  const reset = () => {
    setSelectedDigitalTime('')
    setShowResult(false)
  }

  const isCorrect = showResult && selectedDigitalTime === `${question.hour.toString().padStart(2, '0')}:${question.minute.toString().padStart(2, '0')}`

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Analog till Digital</h1>
        <p className="text-lg text-gray-600">
          Fråga {currentQuestion + 1} av {questions.length}
        </p>
        <div className="flex justify-center items-center space-x-8 text-lg">
          <span className="text-green-600 font-semibold">Poäng: {score}</span>
          <span className="text-blue-600 font-semibold">Försök: {attempts}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Analog clock */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-center mb-6">
              Titta på klockan
            </h2>
            
            <div className="flex justify-center mb-6">
              <ClockComponent
                hour={question.hour}
                minute={question.minute}
                interactive={false}
                size={250}
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-xl mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Tänk på</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Timvisaren visar timmarna</li>
                <li>• Läs den korta visaren först</li>
                <li>• Läs sedan den långa visaren</li>
                <li>• Skriv tiden som TT:MM</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Digital input */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {question.text}
            </h2>
            
            {/* Digital time display */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Välj rätt digital tid:
              </label>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {digitalOptions.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDigitalTime(time)}
                    className={`p-6 rounded-xl border-2 font-bold text-2xl transition-all ${
                      time === selectedDigitalTime
                        ? 'bg-purple-500 text-white border-purple-500'
                        : 'bg-white border-gray-300 hover:border-purple-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual feedback */}
            {selectedDigitalTime && (
              <div className="mb-6 p-4 bg-yellow-50 rounded-xl">
                <h3 className="font-semibold text-yellow-900 mb-2">Ditt val:</h3>
                <div className="text-3xl font-bold text-yellow-800">
                  {selectedDigitalTime}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={reset}
                className="btn-secondary"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Återställ
              </button>
              
              <button
                onClick={checkAnswer}
                disabled={!selectedDigitalTime || showResult}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Kontrollera svar
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
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <span className="text-xl font-bold text-green-800">Rätt!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-8 h-8 text-red-600" />
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
                  <p className="font-semibold">Perfekt!</p>
                  <p>Analoga klockan visar {question.hour.toString().padStart(2, '0')}:{question.minute.toString().padStart(2, '0')}</p>
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
      </div>

      {/* Progress summary */}
      {currentQuestion === questions.length - 1 && showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Digital mästare! 🎉
          </h2>
          <div className="text-lg space-y-2">
            <p>Du klarade alla {questions.length} frågor</p>
            <p className="text-green-600 font-semibold">
              Poäng: {score} av {questions.length}
            </p>
            <p className="text-purple-600">
              Procent: {Math.round((score / questions.length) * 100)}%
            </p>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="btn-secondary"
            >
              Tillbaka till övningar
            </button>
            <button
              onClick={() => {
                setCurrentQuestion(0)
                setScore(0)
                setAttempts(0)
                setSelectedDigitalTime('')
                setShowResult(false)
              }}
              className="btn-primary"
            >
              Öva igen
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default AnalogDigital

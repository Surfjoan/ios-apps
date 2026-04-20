import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, RotateCcw, Clock } from 'lucide-react'
import ClockComponent from '../../components/Clock'

interface Question {
  id: number
  hour: number
  minute: number
  text: string
  type: 'half-past' | 'half-to'
}

const HalfHour: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedHour, setSelectedHour] = useState<number | null>(null)
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const questions: Question[] = [
    { id: 1, hour: 3, minute: 30, text: 'Vad är klockan?', type: 'half-past' },
    { id: 2, hour: 7, minute: 30, text: 'Vad är klockan?', type: 'half-past' },
    { id: 3, hour: 12, minute: 30, text: 'Vad är klockan?', type: 'half-past' },
    { id: 4, hour: 5, minute: 30, text: 'Vad är klockan?', type: 'half-past' },
    { id: 5, hour: 9, minute: 30, text: 'Vad är klockan?', type: 'half-past' },
    { id: 6, hour: 2, minute: 30, text: 'Vad är klockan?', type: 'half-past' },
    { id: 7, hour: 8, minute: 30, text: 'Vad är klockan?', type: 'half-past' },
    { id: 8, hour: 4, minute: 30, text: 'Vad är klockan?', type: 'half-past' },
    { id: 9, hour: 6, minute: 30, text: 'Vad är klockan?', type: 'half-past' },
    { id: 10, hour: 10, minute: 30, text: 'Vad är klockan?', type: 'half-past' }
  ]

  const question = questions[currentQuestion]

  const handleTimeChange = (hour: number, minute: number) => {
    setSelectedHour(hour)
    setSelectedMinute(minute)
  }

  const checkAnswer = () => {
    if (selectedHour === null || selectedMinute === null) return
    
    setShowResult(true)
    setAttempts(attempts + 1)
    
    const isCorrect = selectedHour === question.hour && selectedMinute === question.minute
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedHour(null)
      setSelectedMinute(null)
      setShowResult(false)
    }
  }

  const reset = () => {
    setSelectedHour(null)
    setSelectedMinute(null)
    setShowResult(false)
  }

  const isCorrect = showResult && selectedHour === question.hour && selectedMinute === question.minute

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Halv timme</h1>
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
        {/* Interactive clock */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-center mb-6">
              Dra visarna till halv timme
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

            {/* Visual guide */}
            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Kom ihåg</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Halv timme = minutvisaren på 6</p>
                <p>• Timvisaren pekar på timmen <strong>efter</strong> halv</p>
                <p>• {question.hour}:30 = {question.hour > 12 ? question.hour - 12 : question.hour} och en halv</p>
              </div>
            </div>

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
                disabled={selectedHour === null || selectedMinute === null || showResult}
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
                  Rätt svar var {question.hour}:30
                </p>
              )}

              {isCorrect && (
                <div className="mt-3 text-green-700">
                  <p className="font-semibold">Bra jobbat!</p>
                  <p>{question.hour > 12 ? question.hour - 12 : question.hour} och en halv</p>
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

        {/* Question and comparison */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
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

            {/* Comparison */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
                <h3 className="font-semibold text-center mb-2">Hel timme</h3>
                <div className="flex justify-center">
                  <ClockComponent
                    hour={question.hour}
                    minute={0}
                    interactive={false}
                    size={120}
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  {question.hour}:00
                </p>
              </div>
              
              <div className="bg-blue-100 p-4 rounded-xl border-2 border-blue-300">
                <h3 className="font-semibold text-center mb-2">Halv timme</h3>
                <div className="flex justify-center">
                  <ClockComponent
                    hour={question.hour}
                    minute={30}
                    interactive={false}
                    size={120}
                  />
                </div>
                <p className="text-center text-sm text-blue-700 font-semibold mt-2">
                  {question.hour}:30
                </p>
              </div>
            </div>

            {/* Time expressions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Tidsuttryck:
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-semibold text-yellow-800">
                    {question.hour > 12 ? question.hour - 12 : question.hour} och en halv
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-semibold text-green-800">
                    Halv {question.hour > 12 ? question.hour - 12 : question.hour}
                  </p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 p-4 bg-purple-50 rounded-xl">
              <h3 className="font-semibold text-purple-800 mb-2">💡 Tips</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Halv timme = minutvisaren pekar rakt upp</li>
                <li>• Timvisaren pekar på timmen <strong>efter</strong> halv</li>
                <li>• Tänk: "halv vägen" till nästa timme</li>
                <li>• Du kan dra visarna eller använda klockan som hjälp</li>
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
          className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Halvtimsmästare! 🎉
          </h2>
          <div className="text-lg space-y-2">
            <p>Du klarade alla {questions.length} frågor</p>
            <p className="text-green-600 font-semibold">
              Poäng: {score} av {questions.length}
            </p>
            <p className="text-blue-600">
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
                setSelectedHour(null)
                setSelectedMinute(null)
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

export default HalfHour

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Volume2, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Clock from '../../components/Clock'

interface Part {
  id: string
  name: string
  description: string
  color: string
}

const Introduction: React.FC = () => {
  const navigate = useNavigate()
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const parts: Part[] = [
    {
      id: 'face',
      name: 'Urtavla',
      description: 'Den runda skivan med siffror',
      color: 'bg-blue-100 border-blue-300'
    },
    {
      id: 'hour-hand',
      name: 'Timvisare',
      description: 'Den korta, tjocka visaren',
      color: 'bg-green-100 border-green-300'
    },
    {
      id: 'minute-hand',
      name: 'Minutvisare',
      description: 'Den långa, tunna visaren',
      color: 'bg-purple-100 border-purple-300'
    },
    {
      id: 'numbers',
      name: 'Siffror',
      description: 'Siffrorna som visar timmarna',
      color: 'bg-yellow-100 border-yellow-300'
    }
  ]

  const steps = [
    'En klocka hjälper oss veta vad klockan är',
    'Den har en rund urtavla med siffror',
    'Timvisaren visar timmarna',
    'Minutvisaren visar minuterna',
    'Tillsammans visar de exakt tid'
  ]

  const handlePartClick = (partId: string) => {
    setSelectedPart(partId)
    // Play sound effect in future
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate('/learn')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Tillbaka till lärandet</span>
        </button>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Lär känna klockan</h1>
          <p className="text-lg text-gray-600">
            Steg {currentStep + 1} av {steps.length}
          </p>
        </div>
        <div className="w-32"></div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive clock */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-center mb-6">Utforska klockan</h2>
            
            {/* Interactive clock with clickable parts */}
            <div className="relative inline-block">
              <Clock hour={10} minute={10} size={250} />
              
              {/* Overlay for clickable parts */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full h-full">
                  {parts.map((part) => (
                    <button
                      key={part.id}
                      onClick={() => handlePartClick(part.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedPart === part.id
                          ? `${part.color} scale-105 shadow-lg`
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto mb-2 rounded bg-gray-200"></div>
                        <p className="text-sm font-semibold">{part.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected part info */}
            {selectedPart && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-blue-50 rounded-xl"
              >
                <h3 className="font-bold text-blue-900 mb-2">
                  {parts.find(p => p.id === selectedPart)?.name}
                </h3>
                <p className="text-blue-700">
                  {parts.find(p => p.id === selectedPart)?.description}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Lär dig steg för steg</h2>
            
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    index === currentStep
                      ? 'bg-white shadow-md border-l-4 border-indigo-500'
                      : 'bg-white/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === currentStep
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <p className={`flex-1 ${
                    index === currentStep ? 'text-gray-800 font-semibold' : 'text-gray-600'
                  }`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Föregående
              </button>
              
              <button className="btn-icon bg-indigo-100 text-indigo-600">
                <Volume2 className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === steps.length - 1 ? 'Klar!' : 'Nästa'}
                {currentStep < steps.length - 1 && <ChevronRight className="w-5 h-5 ml-1" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduction

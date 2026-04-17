import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, User, Settings, Award } from 'lucide-react'

const progress = {
  totalStars: 45,
  completedLevels: 8,
  totalLevels: 12,
  streak: 5,
  lastActive: 'Idag',
}

const stats = [
  { label: 'Totala stjärnor', value: progress.totalStars, icon: Award, color: 'text-yellow-500' },
  { label: 'Avklarade nivåer', value: `${progress.completedLevels}/${progress.totalLevels}`, icon: BarChart3, color: 'text-green-500' },
  { label: 'Dagars streak', value: progress.streak, icon: Award, color: 'text-orange-500' },
  { label: 'Senast aktiv', value: progress.lastActive, icon: User, color: 'text-blue-500' },
]

const ParentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Föräldrapanel</h1>
        <p className="text-gray-600">Följ ditt barns framsteg och anpassa inställningar</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card text-center"
            >
              <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          )
        })}
      </div>

      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="w-6 h-6 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-800">Inställningar</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <div className="font-semibold text-gray-800">Ljud</div>
              <div className="text-sm text-gray-600">Aktivera ljudeffekter</div>
            </div>
            <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <div className="font-semibold text-gray-800">Röstguidning</div>
              <div className="text-sm text-gray-600">Talade instruktioner</div>
            </div>
            <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-semibold text-gray-800">Svårighetsgrad</div>
              <div className="text-sm text-gray-600">Justera automatisk</div>
            </div>
            <select className="px-3 py-2 border rounded-lg bg-white">
              <option>Automatisk</option>
              <option>Lätt</option>
              <option>Medel</option>
              <option>Svårt</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParentDashboard

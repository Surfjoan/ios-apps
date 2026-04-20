import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Practice from './pages/Practice'
import Play from './pages/Play'
import ParentDashboard from './pages/ParentDashboard'
import Layout from './components/Layout'
import { Introduction, WholeHour, HalfHour, AnalogDigital } from './pages/exercises'
import { Memory, QuickTime } from './pages/games'
import NotFound from './pages/NotFound'

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn/:levelId?" element={<Learn />} />
            <Route path="/practice/:exerciseId?" element={<Practice />} />
            <Route path="/play" element={<Play />} />
            <Route path="/exercises/introduction" element={<Introduction />} />
            <Route path="/exercises/whole-hour" element={<WholeHour />} />
            <Route path="/exercises/half-hour" element={<HalfHour />} />
            <Route path="/exercises/analog-digital" element={<AnalogDigital />} />
            <Route path="/play/memory" element={<Memory />} />
            <Route path="/play/quicktime" element={<QuickTime />} />
            <Route path="/parent" element={<ParentDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  )
}

export default App

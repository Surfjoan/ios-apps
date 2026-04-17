import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Practice from './pages/Practice'
import Play from './pages/Play'
import ParentDashboard from './pages/ParentDashboard'
import Layout from './components/Layout'

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
            <Route path="/parent" element={<ParentDashboard />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  )
}

export default App

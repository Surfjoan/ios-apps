import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Database } from 'sqlite3'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Database setup
const db = new Database(':memory:') // Use file database in production

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    age INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)
  
  db.run(`CREATE TABLE IF NOT EXISTS progress (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    level INTEGER,
    stars INTEGER,
    completed BOOLEAN,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`)
})

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Create user
app.post('/api/users', (req, res) => {
  const { name, age } = req.body
  const id = uuidv4()
  
  db.run('INSERT INTO users (id, name, age) VALUES (?, ?, ?)', 
    [id, name, age], 
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.json({ id, name, age })
    }
  )
})

// Get user progress
app.get('/api/users/:id/progress', (req, res) => {
  const { id } = req.params
  
  db.all('SELECT * FROM progress WHERE user_id = ? ORDER BY timestamp DESC', 
    [id], 
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.json(rows)
    }
  )
})

// Save progress
app.post('/api/progress', (req, res) => {
  const { user_id, level, stars, completed } = req.body
  const id = uuidv4()
  
  db.run('INSERT INTO progress (id, user_id, level, stars, completed) VALUES (?, ?, ?, ?, ?)',
    [id, user_id, level, stars, completed],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.json({ id, user_id, level, stars, completed })
    }
  )
})

// Get statistics
app.get('/api/stats/:userId', (req, res) => {
  const { userId } = req.params
  
  db.get(`
    SELECT 
      COUNT(DISTINCT level) as completed_levels,
      SUM(stars) as total_stars,
      MAX(timestamp) as last_active
    FROM progress 
    WHERE user_id = ? AND completed = 1
  `, [userId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json(row)
  })
})

// Serve static frontend files
import path from 'path'
app.use(express.static(path.join(__dirname, '../../frontend/dist')))

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

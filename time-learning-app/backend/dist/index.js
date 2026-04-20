"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const sqlite3_1 = require("sqlite3");
const uuid_1 = require("uuid");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Database setup
const db = new sqlite3_1.Database('./time_learning.db'); // Use file database for persistence
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    age INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
    db.run(`CREATE TABLE IF NOT EXISTS progress (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    level INTEGER,
    stars INTEGER,
    completed BOOLEAN,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
    db.run(`CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY,
    level_id INTEGER,
    type TEXT,
    title TEXT,
    description TEXT,
    data TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});
// API Routes
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Create user
app.post('/api/users', (req, res) => {
    const { name, age } = req.body;
    const id = (0, uuid_1.v4)();
    db.run('INSERT INTO users (id, name, age) VALUES (?, ?, ?)', [id, name, age], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id, name, age });
    });
});
// Get user progress
app.get('/api/users/:id/progress', (req, res) => {
    const { id } = req.params;
    db.all('SELECT * FROM progress WHERE user_id = ? ORDER BY timestamp DESC', [id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});
// Get exercises
app.get('/api/exercises', (req, res) => {
    const { levelId } = req.query;
    db.all('SELECT * FROM exercises WHERE level_id = ? ORDER BY id', [levelId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});
// Save progress
app.post('/api/progress', (req, res) => {
    const { user_id, level, stars, completed } = req.body;
    const id = (0, uuid_1.v4)();
    db.run('INSERT INTO progress (id, user_id, level, stars, completed) VALUES (?, ?, ?, ?, ?)', [id, user_id, level, stars, completed], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id, user_id, level, stars, completed });
    });
});
// Get statistics
app.get('/api/stats/:userId', (req, res) => {
    const { userId } = req.params;
    db.get(`
    SELECT 
      COUNT(DISTINCT level) as completed_levels,
      SUM(stars) as total_stars,
      MAX(timestamp) as last_active
    FROM progress 
    WHERE user_id = ? AND completed = 1
  `, [userId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});
// Serve static frontend files
const path_1 = __importDefault(require("path"));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/index.html'));
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map
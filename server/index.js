require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

app.use(bodyParser.json());
app.use(cookieParser());

// In development allow CORS from GitHub Pages or localhost
app.use(cors({ origin: true, credentials: true }));

// Serve static admin site when running server locally
app.use('/', express.static('../'));

function authMiddleware(req, res, next){
  const token = req.cookies && req.cookies.token;
  if(!token) return res.status(401).json({ error: 'No token' });
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  }catch(e){
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function roleCheck(roles){
  return function(req, res, next){
    if(!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if(roles.includes(req.user.role)) return next();
    return res.status(403).json({ error: 'Forbidden' });
  }
}

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body || {};
  if(!username || !password) return res.status(400).json({ error: 'username and password required' });

  const user = await db.getUserByUsername(username);
  if(!user) return res.status(401).json({ error: 'Invalid credentials' });

  const bcrypt = require('bcrypt');
  const match = await bcrypt.compare(password, user.password_hash);
  if(!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  // Set as HttpOnly cookie
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  res.json({ ok: true, user: { username: user.username, role: user.role, full_name: user.full_name } });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

app.get('/api/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/reports', authMiddleware, async (req, res) => {
  const reports = await db.getReports();
  res.json({ reports });
});

app.post('/api/reports', authMiddleware, roleCheck(['admin','leader']), async (req, res) => {
  const { title, author, date, message } = req.body || {};
  if(!title || !message) return res.status(400).json({ error: 'title and message required' });
  const id = await db.createReport({ title, author, date, message });
  res.json({ ok: true, id });
});

app.put('/api/reports/:id', authMiddleware, roleCheck(['admin','leader']), async (req, res) => {
  const id = Number(req.params.id);
  const { title, author, date, message, resolved } = req.body || {};
  await db.updateReport(id, { title, author, date, message, resolved });
  res.json({ ok: true });
});

app.delete('/api/reports/:id', authMiddleware, roleCheck(['admin','leader']), async (req, res) => {
  const id = Number(req.params.id);
  await db.deleteReport(id);
  res.json({ ok: true });
});

// Start DB and server
(async ()=>{
  await db.init();
  app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();

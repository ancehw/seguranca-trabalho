const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const bcrypt = require('bcrypt');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data.sqlite');
let db;

async function init(){
  db = await open({ filename: DB_PATH, driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL,
      full_name TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      author TEXT,
      date TEXT,
      message TEXT,
      resolved INTEGER DEFAULT 0
    );
  `);

  // Seed users if none
  const count = await db.get('SELECT COUNT(*) as c FROM users');
  if(count.c === 0){
    console.log('Seeding users...');
    const users = [
      { username: 'gabriel-lima', password: 'LiderPass!2026', role: 'leader', full_name: 'Gabriel Lima' },
      { username: 'dayllon-kauan', password: 'AdmDK#2026', role: 'admin', full_name: 'Dayllon Kauan' },
      { username: 'adryan-kaue', password: 'AdmAK#2026', role: 'admin', full_name: 'Adryan Kaue' },
      { username: 'visitante-teste', password: 'Visita2026', role: 'visitor', full_name: 'Visitante de Teste' }
    ];
    for(const u of users){
      const hash = await bcrypt.hash(u.password, 12);
      await db.run('INSERT INTO users (username,password_hash,role,full_name) VALUES (?,?,?,?)', [u.username, hash, u.role, u.full_name]);
    }
  }

  // Seed reports if none
  const rc = await db.get('SELECT COUNT(*) as c FROM reports');
  if(rc.c === 0){
    console.log('Seeding reports...');
    await db.run('INSERT INTO reports (title,author,date,message) VALUES (?,?,?,?)', ['Máquinas sem EPI','Funcionário A','2026-08-16','Operadores trabalhando sem equipamentos de proteção individual na linha 3.']);
    await db.run('INSERT INTO reports (title,author,date,message) VALUES (?,?,?,?)', ['Saída de emergência bloqueada','Funcionário B','2026-08-17','Caixas empilhadas bloqueando a saída de emergência do setor 2.']);
  }
}

async function getUserByUsername(username){
  return db.get('SELECT * FROM users WHERE username = ?', username);
}

async function getReports(){
  return db.all('SELECT * FROM reports ORDER BY id DESC');
}

async function createReport({ title, author, date, message }){
  const res = await db.run('INSERT INTO reports (title,author,date,message) VALUES (?,?,?,?)', [title, author || null, date || null, message]);
  return res.lastID;
}

async function updateReport(id, { title, author, date, message, resolved }){
  const r = await db.get('SELECT * FROM reports WHERE id = ?', id);
  if(!r) throw new Error('Not found');
  const resolvedVal = resolved ? 1 : 0;
  await db.run('UPDATE reports SET title = ?, author = ?, date = ?, message = ?, resolved = ? WHERE id = ?', [title || r.title, author || r.author, date || r.date, message || r.message, resolvedVal, id]);
}

async function deleteReport(id){
  await db.run('DELETE FROM reports WHERE id = ?', id);
}

module.exports = { init, getUserByUsername, getReports, createReport, updateReport, deleteReport };

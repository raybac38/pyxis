import express, { json } from 'express';
import Database from 'better-sqlite3';
import {DatabaseService} from './service/databaseService.js'
import { AuthService } from './service/authService.js';

const app = express();

app.use(json());

const databaseService = new DatabaseService();

const authService = new AuthService(databaseService.getAccountRepository());

app.post('/account/register', (req, res) => authService.register(req, res));
app.post('/account/login', (req, res) => authService.login(req, res));



// db.prepare(`
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY,
//     name TEXT
//   )
// `).run();

// app.get('/users', (req, res) => {
//   const users = db.prepare('SELECT * FROM users').all();
//   res.json(users);
// });

// app.post('/users', (req, res) => {
//   const { name } = req.body;
//   db.prepare('INSERT INTO users (name) VALUES (?)').run(name);
//   res.sendStatus(201);
// });

// app.listen(process.env.PORT || 3000, () => {
//   console.log('Server running');
// });

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
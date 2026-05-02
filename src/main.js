import express, { json } from 'express';
import Database from 'better-sqlite3';
import {DatabaseService} from './service/databaseService.js'

const app = express();

app.use(json());

let databaseService = new DatabaseService();


let userRepository = databaseService.getUserRepository();



console.log(userRepository.getUserByLogin("popo"));
console.log(userRepository.createUser("popo", "raybac", "123"));
console.log(userRepository.getUserByLogin("popo"));



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


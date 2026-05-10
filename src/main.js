import express, { json } from 'express';
import Database from 'better-sqlite3';
import {DatabaseService} from './service/databaseService.js'
import { AuthService } from './service/authService.js';
import cors from 'cors';

const app = express();

app.use(json());

const databaseService = new DatabaseService();

const authService = new AuthService(databaseService.getAccountRepository());

app.use(cors({
  origin: "http://localhost:3001",  /// frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  authService.auth(req, res, next);
});


apiRouter.get('/me', (req, res) => authService.info(req, res));

app.use('/api', apiRouter);

app.post('/account/register', (req, res) => authService.register(req, res));
app.post('/account/login', (req, res) => authService.login(req, res));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

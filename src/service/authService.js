import jwt from "jsonwebtoken";
import { AccountRepository } from "../repository/accountRepository.js";
import * as argon2 from "argon2";

class AuthService {
  /**
   * Create an authentificator
   * @param {AccountRepository} accountRepository
   */
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  /**
   * Register a account
   * Need in body
   * - login
   * - username
   * - password
   * @param {*} req
   * @param {*} res
   */
  async register(req, res) {
    const body = req.body;
    const login = body.login;
    const username = body.username;
    const password = body.password;

    /// is account existe ?
    if (this.accountRepository.getByLogin(login) != undefined) {
      res.status(409).send("LOGIN ALREADY TAKEN");
      return;
    }

    const hash = await argon2.hash(password);
    this.accountRepository.create(login, username, hash);

    const account = this.accountRepository.getByLogin(login);

    const token = this.generateToken(account.id, login);

    res
      .status(201)
      .json({
        token: token,
        username: username,
        userId: account.id,
        login: login,
      });
  }

  /**
   * Login, and get token
   * @param {*} req
   * @param {*} res
   */
  async login(req, res) {
    const body = req.body;
    const login = body.login;
    const password = body.password;

    const account = this.accountRepository.getByLogin(login);
    if(account == undefined){
      res.status(401).end();  /// account not found
      return;
    }

    const hash = await account.pwd_hash;
    if(!argon2.verify(hash, password)){
      res.status(401).end();  /// wrong password
      return;
    }
    const token = this.generateToken(account.id, login);

    res.status(201).json({
      token: token,
      username : account.username,
      userId : account.id,
      login : login
    })
  }

  auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; /// put id of token into user id
      next();
    } catch (err) {
      return res.status(403).json({ error: "Token invalide" });
    }
  }

  generateToken(userId, login) {
    return jwt.sign(
      {
        userId: userId,
        login: login,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
  }

  info(req, res) {
    
    return res.status(200).json(this.accountRepository.getById(req.user.userId));
  }
}

export { AuthService };

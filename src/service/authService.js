import jwt from "jsonwebtoken";

class AuthService {
  /**
   * Create an authentificator
   * @param {BetterSqlite3.Database} database
   */
  constructor(database) {
    this.database = database;
  }

  register(req, res) {
    console.log(req);
    console.log(res);
  }

  login(req, res) {}

  auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;   /// put id of token into user id
      next();
    } catch (err) {
      return res.status(403).json({ error: "Token invalide" });
    }
  }

  generateToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        login: user.login,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
  }
}


export {AuthService}
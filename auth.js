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
        
    }


    login(req, res) {

    }

    generateToken(user) {
        return jwt.sign(
            {
                userId: user.id,
                login: user.login
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
    }
}
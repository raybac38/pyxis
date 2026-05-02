import Database from 'better-sqlite3';
import {AccountRepository} from '../repository/accountRepository.js'
import fs from "fs";

class DatabaseService {

    constructor() {
        this.database = new Database('db.sqlite');
        this.init();
        this.userRepository = new AccountRepository(this.database);
    }

    init() {
        const initSQL = fs.readFileSync("./init.sql", "utf-8"); 
        this.database.exec(initSQL);    
        console.log("bd initialized");   
    }

    getUserRepository() {
        return this.userRepository;
    }
}

export {DatabaseService};
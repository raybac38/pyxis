class AccountRepository {

    /**
     * 
     * @param {BetterSqlite3.Database} database 
     */
    constructor(database) {
        this.database = database;
    }

    getByLogin(login) {
        return this.database.prepare(`
            SELECT * FROM Account
            WHERE login == ?`).get(login);

    }

    getById(id) {
        return this.database.prepare(`
            SELECT * FROM Account
            WHERE id == ?`).get(id);

    }

    create(login, user_name, pwd_hash) {
        return this.database.prepare(`
            INSERT INTO Account (login, user_name, pwd_hash)
            VALUES (?,?,?)
            `).run(login, user_name, pwd_hash);
    }

    delete(id) {
        return this.database.prepare(`
            DELETE FROM Account
            WHERE id == ?`).run(id);
    }

    update(id, login, user_name, pwd_hash) {
        return this.database.prepare(`
            UPDATE Account
            SET login=?, user_name=?,pwd_hash=?
            WHERE id == ?
            `).run(login, user_name, pwd_hash, id);
    }
}

export { AccountRepository };
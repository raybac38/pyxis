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

    create(login, username, pwd_hash) {
        return this.database.prepare(`
            INSERT INTO Account (login, username, pwd_hash)
            VALUES (?,?,?)
            `).run(login, username, pwd_hash);
    }

    delete(id) {
        return this.database.prepare(`
            DELETE FROM Account
            WHERE id == ?`).run(id);
    }

    update(id, login, username, pwd_hash) {
        return this.database.prepare(`
            UPDATE Account
            SET login=?, username=?,pwd_hash=?
            WHERE id == ?
            `).run(login, username, pwd_hash, id);
    }
}

export { AccountRepository };
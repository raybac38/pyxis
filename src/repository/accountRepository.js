class AccountRepository {

    /**
     * 
     * @param {BetterSqlite3.tx} tx 
     */
    constructor(tx) {
        this.tx = tx;
    }

    getByLogin(login) {
        return this.tx.prepare(`
            SELECT * FROM Account
            WHERE login == ?`).get(login);

    }

    getById(id) {
        return this.tx.prepare(`
            SELECT * FROM Account
            WHERE id == ?`).get(id);

    }

    create(login, username, pwd_hash) {
        return this.tx.prepare(`
            INSERT INTO Account (login, username, pwd_hash)
            VALUES (?,?,?)
            `).run(login, username, pwd_hash);
    }

    delete(id) {
        return this.tx.prepare(`
            DELETE FROM Account
            WHERE id == ?`).run(id);
    }

    update(id, login, username, pwd_hash) {
        return this.tx.prepare(`
            UPDATE Account
            SET login=?, username=?,pwd_hash=?
            WHERE id == ?
            `).run(login, username, pwd_hash, id);
    }
}

export { AccountRepository };
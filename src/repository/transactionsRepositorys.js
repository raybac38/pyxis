class TransactionsRepository {

    constructor(database) {
        this.database = database;
    }


    getById(id) {
        return this.database.prepare(`
            SELECT * FROM Transactions
            WHERE id == ?`).get(id)
    }

    getLastestFromUserId(user_id) {
        return this.database.prepare(`
            SELECT * FROM Transaction
            WHERE account_id == ?
            ORDER BY timestamp DESC
            LIMITE 1`).get(user_id)
    }

    create(account_id, store_id, timestamp) {
        return this.database.prepare(`
            INSERT INTO Transactions (account_id, store_id, timestamp)
            VALUES (?,?,?)`).run(account_id, store_id, timestamp)
    }

    delete(id) {
        return this.database.prepare(`
            DELETE FROM Transactions
            WHERE id == ?`).run(id)
    }

    update(id, account_id, store_id, timestamp) {
        return this.database.prepare(`
            UPDATE Transactions
            SET account_id=?, store_id=?, timestamp=?
            WHERE id == ?`).run(account_id, store_id, timestamp, id)
    }
}

export { TransactionsRepository}
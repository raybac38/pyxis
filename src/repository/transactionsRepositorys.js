class TransactionsRepository {

    constructor(tx) {
        this.tx = tx;
    }


    getById(id) {
        return this.tx.prepare(`
            SELECT * FROM Transactions
            WHERE id == ?`).get(id)
    }

    getLastestFromUserId(user_id) {
        return this.tx.prepare(`
            SELECT * FROM Transaction
            WHERE account_id == ?
            ORDER BY timestamp DESC
            LIMITE 1`).get(user_id)
    }

    create(account_id, store_id, timestamp) {
        return this.tx.prepare(`
            INSERT INTO Transactions (account_id, store_id, timestamp)
            VALUES (?,?,?)`).run(account_id, store_id, timestamp)
    }

    delete(id) {
        return this.tx.prepare(`
            DELETE FROM Transactions
            WHERE id == ?`).run(id)
    }

    update(id, account_id, store_id, timestamp) {
        return this.tx.prepare(`
            UPDATE Transactions
            SET account_id=?, store_id=?, timestamp=?
            WHERE id == ?`).run(account_id, store_id, timestamp, id)
    }
}

export { TransactionsRepository}


class TransactionItemRepository{

    constructor(database){
        this.database = database;
    }
    getById(id){
        return this.database.prepare(`
            SELECT * FROM TransactionItem
            WHERE id == ?`).get(id)
    }

    getByTransactionId(transaction_id) {
        return this.database.prepare(`
            SELECT * FROM TransactionItem
            WHERE transaction_id == ?`).get(transaction_id)
    }

    create(transaction_id, product_variant_id, quantity, price, expire, remaining){
        return this.database.prepare(`
            INSERT INTO TransactionItem (transaction_id, product_variant_id, quantity, prince, expire, remaining)
            VALUES (?,?,?,?,?,?)`).run(transaction_id, product_variant_id, quantity, price, expire, remaining)
    }

    update(id, transaction_id, product_variant_id, quantity, price, expire, remaining){
        return this.database.prepare(`
            UPDATE TransactionItem
            SET reansaction_id=?, product_variant_id=?, quantity=?, price=?, expire=?, remaining=?
            WHERE id=?`).run(transaction_id, product_variant_id, quantity, price, expire, remaining, id)
    }

    delete(id) {
        return this.database.prepare(`
            DELETE FROM TransactionItem
            WHERE id == ?`).run(id)
    }

}
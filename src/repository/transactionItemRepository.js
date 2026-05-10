

class TransactionItemRepository{

    constructor(tx){
        this.tx = tx;
    }
    getById(id){
        return this.tx.prepare(`
            SELECT * FROM TransactionItem
            WHERE id == ?`).get(id)
    }

    getByTransactionId(transaction_id) {
        return this.tx.prepare(`
            SELECT * FROM TransactionItem
            WHERE transaction_id == ?`).get(transaction_id)
    }

    create(transaction_id, product_variant_id, quantity, price, expire, remaining){
        return this.tx.prepare(`
            INSERT INTO TransactionItem (transaction_id, product_variant_id, quantity, prince, expire, remaining)
            VALUES (?,?,?,?,?,?)`).run(transaction_id, product_variant_id, quantity, price, expire, remaining)
    }

    update(id, transaction_id, product_variant_id, quantity, price, expire, remaining){
        return this.tx.prepare(`
            UPDATE TransactionItem
            SET transaction_id=?, product_variant_id=?, quantity=?, price=?, expire=?, remaining=?
            WHERE id=?`).run(transaction_id, product_variant_id, quantity, price, expire, remaining, id)
    }

    delete(id) {
        return this.tx.prepare(`
            DELETE FROM TransactionItem
            WHERE id == ?`).run(id)
    }

}

export {TransactionItemRepository}
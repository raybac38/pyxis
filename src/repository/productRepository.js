class ProductRepository {

    /**
     * 
     * @param {BetterSqlite3.tx} tx 
     */
    constructor(tx) {
        this.tx = tx;
    }

    getByName(name) {
        return this.tx.prepare(`
            SELECT * FROM Product
            WHERE name == ?`).get(name);
    }

    getById(id) {
        return this.tx.prepare(`
            SELECT * FROM Product
            WHERE id == ?`).get(id);
    }

    create(name) {
        return this.tx.prepare(`
            INSERT INTO Product (name)
            VALUES (?)
            `).run(name);
    }

    delete(id) {
        return this.tx.prepare(`
            DELETE FROM Product
            WHERE id == ?`).run(id);
    }

    update(id, name) {
        return this.tx.prepare(`
            UPDATE Product
            SET name=?
            WHERE id == ?
            `).run(name, id);
    }
}

export { ProductRepository };
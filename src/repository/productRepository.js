class ProductRepository {

    /**
     * 
     * @param {BetterSqlite3.Database} database 
     */
    constructor(database) {
        this.database = database;
    }

    getByName(name) {
        return this.database.prepare(`
            SELECT * FROM Product
            WHERE name == ?`).get(name);
    }

    getById(id) {
        return this.database.prepare(`
            SELECT * FROM Product
            WHERE id == ?`).get(id);
    }

    create(name) {
        return this.database.prepare(`
            INSERT INTO Product (name)
            VALUES (?)
            `).run(name);
    }

    delete(id) {
        return this.database.prepare(`
            DELETE FROM Product
            WHERE id == ?`).run(id);
    }

    update(id, name) {
        return this.database.prepare(`
            UPDATE Product
            SET name=?
            WHERE id == ?
            `).run(name, id);
    }
}

export { UserRepository };
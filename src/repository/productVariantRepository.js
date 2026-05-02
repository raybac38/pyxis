class ProductVariantRepository {
    constructor(database) {
        this.database = database;
    }

    getByName(name) {
        return this.database.prepare(`
            SELECT * FROM ProductVariant
            WHERE name == ?`).get(name);
    }

    getById(id) {
        return this.database.prepare(`
            SELECT * FROM ProductVariant
            WHERE id == ?`).get(id);
    }

    getProductAndVariant(id) {
        return this.database.prepare(`
            SELECT * FROM ProductVariant as pv
            JOIN Product AS p
            ON p.id = pv.product_id
            WHERE id == ?`).get(id);
    }

    create(name) {
        return this.database.prepare(`
            INSERT INTO ProductVariant (name)
            VALUES (?)
            `).run(name);
    }

    delete(id) {
        return this.database.prepare(`
            DELETE FROM ProductVariant
            WHERE id == ?`).run(id);
    }

    update(id, product_id, name) {
        return this.database.prepare(`
            UPDATE ProductVariant
            SET product_id=?, name=?
            WHERE id == ?
            `).run(name, id);
    }

}

export { ProductVariantRepository }
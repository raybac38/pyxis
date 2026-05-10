class ProductVariantRepository {
    constructor(tx) {
        this.tx = tx;
    }

    getByName(name) {
        return this.tx.prepare(`
            SELECT * FROM ProductVariant
            WHERE name == ?`).get(name);
    }

    getById(id) {
        return this.tx.prepare(`
            SELECT * FROM ProductVariant
            WHERE id == ?`).get(id);
    }

    getProductAndVariant(id) {
        return this.tx.prepare(`
            SELECT * FROM ProductVariant as pv
            JOIN Product AS p
            ON p.id = pv.product_id
            WHERE id == ?`).get(id);
    }

    create(name) {
        return this.tx.prepare(`
            INSERT INTO ProductVariant (name)
            VALUES (?)
            `).run(name);
    }

    delete(id) {
        return this.tx.prepare(`
            DELETE FROM ProductVariant
            WHERE id == ?`).run(id);
    }

    update(id, product_id, name) {
        return this.tx.prepare(`
            UPDATE ProductVariant
            SET product_id=?, name=?
            WHERE id == ?
            `).run(name, id);
    }

}

export { ProductVariantRepository }
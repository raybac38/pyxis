class StoreBrandRepository {

    constructor(tx){
        this.tx = tx;
    }

    getById(id) {
        return this.tx.prepare(`
            SELECT * FROM StoreBrand
            WHERE id == ?`).get(id)
    }

    getByName(name){
        return this.tx.prepare(`
            SELECT * FROM StoreBrand
            WHERE name == ?`).get(name)

    }

    create(name) {
        return this.tx.prepare(`
            INSERT INTO StoreBrand (name)
            VALUES (?)
            `).run(name)
    }

    update(id, name){
        return this.tx.prepare(`
            UPDATE StoreBrand
            SET name=?
            WHERE id == ?`).run(name, id)
    }

    delete(id) {
        return this.tx.prepare(`
            DELETE FROM StoreBrand
            WHERE id == ?`).run(id)
    }

}

export { StoreBrandRepository}
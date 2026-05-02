class StoreBrand {

    constructor(database){
        this.database = database;
    }

    getById(id) {
        return this.database.prepare(`
            SELECT * FROM StoreBrand
            WHERE id == ?`).get(id)
    }

    getByName(name){
        return this.database.prepare(`
            SELECT * FROM StoreBrand
            WHERE name == ?`).get(name)

    }

    create(name) {
        return this.database.prepare(`
            INSERT INTO StoreBrand (name)
            VALUES (?)
            `).run(name)
    }

    update(id, name){
        return this.database.prepare(`
            UPDATE StoreBrand
            SET name=?
            WHERE id == ?`).run(name, id)
    }

    delete(id) {
        return this.database.prepare(`
            DELETE FROM StoreBrand
            WHERE id == ?`).run(id)
    }

}
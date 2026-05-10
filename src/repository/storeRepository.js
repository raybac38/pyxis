

class StoreRepository{


    constructor(tx)
    {
        this.tx = tx;
    }

    getByName(name) {
        return this.tx.prepare(`
            SELECT * FROM Store
            WHERE name == ?`).get(name)
    }

    getById(id) {
        return this.tx.prepare(`
            SELECT * FROM Store
            WHERE id == ?`).get(id)
    }

    create(brand_id, name, addr, city, latitude, longitude){
        return this.tx.prepare(`
            INSERT INTO Store (brand_id, name, addr, city, latitude, longitude)
            VALUES (?,?,?,?,?,?)`).run(brand_id, name, addr, city, latitude, longitude)
    }

    update(id, brand_id, name, addr, city, latitude, longitude){
        return this.tx.prepare(`
            UPDATE Store
            SET brand_id=?, name=?, addr=?, city=?, latitude=?, longitude=?
            WHERE id == ?`).run(brand_id, name, addr, city, latitude, longitude, id)
    }

    delete(id){
        return this.tx.prepare(`
            DELETE FROM Store
            WHERE id == ?`).run(id)
    }
}

export { StoreRepository}
class ShoppingListRepository {

    constructor(database) {
        this.database = database;
    }

    getById(id) {
        return this.database.prepare(`
            SELECT * FROM ShoppingList
            WHERE id == ?`).get(id)
    }

    getFromUser(user_id) {
        return this.database.prepare(`
            SELECT * FROM ShoppingList
            WHERE account_id == ?`).get(user_id)
    }

    create(account_id, name) {
        return this.database.prepare(`
            INSERT INTO ShoppingList (account_id, name)
            VALUES (?,?)`).run(account_id, name)
    }

    delete(id) {
        return this.database.prepare(`
            DELETE FROM ShoppingList
            WHERE id == ?`).run(id)
    }

    update(id, account_id, name) {
        return this.database.prepare(`
            UPDATE ShoppingList
            SET name=?, account_id=?
            WHERE id == ?`).run(name, account_id, id)
    }
}

export { ShoppingListRepository }
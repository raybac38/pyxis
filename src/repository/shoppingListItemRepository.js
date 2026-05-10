

class ShoppingListItemRepository{

    constructor(database){
        this.database = database;
    }

    getById(id){
        return this.database.prepare(`
            SELECT * FROM ShoppingListItem
            WHERE id == ?`).get(id)
    }

    getByShoppingListId(shopping_list_id) {
        return this.database.prepare(`
            SELECT * FROM ShoppingListItem
            WHERE shopping_list_id == ?`).get(shopping_list_id)
    }

    create(shopping_list_id, product_variant_id, quantity){
        return this.database.prepare(`
            INSERT INTO ShoppingListItem (shopping_list_id, product_variant_id, quantity)
            VALUES (?,?,?)`).run(shopping_list_id, product_variant_id, quantity)
    }

    update(id, shopping_list_id, product_variant_id, quantity){
        return this.database.prepare(`
            UPDATE ShoppingListItem
            SET shopping_list_id=?, product_variant_id=?, quantity=?
            WHERE id=?`).run(shopping_list_id, product_variant_id, quantity, id)
    }

    delete(id) {
        return this.database.prepare(`
            DELETE FROM ShoppingListItem
            WHERE id == ?`).run(id)
    }

}

export {ShoppingListItemRepository}
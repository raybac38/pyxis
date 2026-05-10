

class ShoppingListItemRepository{

    constructor(tx){
        this.tx = tx;
    }

    getById(id){
        return this.tx.prepare(`
            SELECT * FROM ShoppingListItem
            WHERE id == ?`).get(id)
    }

    getByShoppingListId(shopping_list_id) {
        return this.tx.prepare(`
            SELECT * FROM ShoppingListItem
            WHERE shopping_list_id == ?`).get(shopping_list_id)
    }

    create(shopping_list_id, product_variant_id, quantity){
        return this.tx.prepare(`
            INSERT INTO ShoppingListItem (shopping_list_id, product_variant_id, quantity)
            VALUES (?,?,?)`).run(shopping_list_id, product_variant_id, quantity)
    }

    update(id, shopping_list_id, product_variant_id, quantity){
        return this.tx.prepare(`
            UPDATE ShoppingListItem
            SET shopping_list_id=?, product_variant_id=?, quantity=?
            WHERE id=?`).run(shopping_list_id, product_variant_id, quantity, id)
    }

    delete(id) {
        return this.tx.prepare(`
            DELETE FROM ShoppingListItem
            WHERE id == ?`).run(id)
    }

}

export {ShoppingListItemRepository}
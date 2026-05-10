import { ShoppingListItemRepository } from "../repository/shoppingListItemRepository";
import { ShoppingListRepository } from "../repository/shoppingListRepositorys";

class ShoppingListService {
  /**
   *
   * @param {ShoppingListItemRepository} shoppingListItemReposiroty
   * @param {ShoppingListRepository} shoppingListRepository
   */
  constructor(shoppingListItemReposiroty, shoppingListRepository) {
    this.shoppingListItemReposiroty = shoppingListItemReposiroty;
    this.shoppingListRepository = shoppingListRepository;
  }

  /**
   * Get all shopping list from the current user
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  getShoppingsLists(req, res) {
    return res
      .status(200)
      .json(this.shoppingListRepository.getFromUser(req.user.userId));
  }

  /**
   * Create a new shopping list
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  createShoppingList(req, res) {
    const user_id = req.user.userId;
    const name = req.body.name;
    return res
      .status(200)
      .json(this.shoppingListRepository.create(user_id, name));
  }
}

export { ShoppingListService };

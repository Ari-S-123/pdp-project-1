import IRecipe from "./IRecipe";
import IUser from "./IUser";

export default interface IFavorite {
  /**
   * @returns {IRecipe} The recipe that the favorite belongs to.
   */
  get recipe(): IRecipe;

  /**
   * @returns {IUser} The user that favorited the recipe.
   */
  get user(): IUser;

  /**
   * @returns {Date} The date and time of the favorite.
   */
  get timeCreated(): Date;
}

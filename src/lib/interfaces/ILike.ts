import IRecipe from "./IRecipe";
import IUser from "./IUser";

/**
 * @interface ILike
 * @description Represents a like on a recipe.
 */
export default interface ILike {
  /**
   * @returns {IRecipe} The recipe that the like belongs to.
   */
  get recipe(): IRecipe;

  /**
   * @returns {IUser} The user that liked the recipe.
   */
  get user(): IUser;

  /**
   * @returns {Date} The date and time of the like.
   */
  get timeCreated(): Date;
}

/**
 * @interface ILike
 * @description Represents a like on a recipe.
 */
export default interface ILike {
  /**
   * @returns {string} The ID of the recipe that the like belongs to.
   */
  get recipeId(): string;

  /**
   * @returns {string} The ID of the user that liked the recipe.
   */
  get userId(): string;

  /**
   * @returns {Date} The date and time of the like.
   */
  get timeCreated(): Date;
}

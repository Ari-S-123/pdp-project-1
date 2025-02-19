export default interface IFavorite {
  /**
   * @returns {string} The ID of the recipe that the favorite belongs to.
   */
  get recipeId(): string;

  /**
   * @returns {string} The ID of the user that favorited the recipe.
   */
  get userId(): string;

  /**
   * @returns {Date} The date and time of the favorite.
   */
  get timeCreated(): Date;
}

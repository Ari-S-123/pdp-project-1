import type IRecipe from "./IRecipe";

/**
 * @interface IIngredient
 * @description Represents an ingredient in a recipe.
 */
export default interface IIngredient {
  /**
   * @returns {IRecipe} The recipe that the ingredient belongs to.
   */
  get recipe(): IRecipe;

  /**
   * @returns {string} The name of the ingredient.
   */
  get name(): string;

  /**
   * @returns {number} The volume of the ingredient in milliliters.
   */
  get volumeInMl(): number;

  /**
   * @returns {number} The ABV of the ingredient.
   */
  get abv(): number;

  /**
   * @description Sets the name of the ingredient.
   * @param {string} name The name of the ingredient.
   */
  set name(name: string);

  /**
   * @description Sets the volume of the ingredient in milliliters.
   * @param {number} volumeInMl The volume of the ingredient in milliliters.
   */
  set volumeInMl(volumeInMl: number);

  /**
   * @description Sets the ABV of the ingredient.
   * @param {number} abv The ABV of the ingredient.
   */
  set abv(abv: number);

  // Can't be implemented and also be tested locally by other people without either exposing my API key or forcing graders to get their own API key.
  // /**
  //  * @description Finds the local source of the ingredient.
  //  * @returns {string} The local source of the ingredient.
  //  */
  // findLocalSource(): string;
}

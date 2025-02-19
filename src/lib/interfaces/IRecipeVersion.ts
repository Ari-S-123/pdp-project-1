import IRecipe from "./IRecipe";

/**
 * @interface IRecipeVersion
 * @extends {IRecipe}
 * @description Represents a snapshot version of a recipe.
 */
export default interface IRecipeVersion extends IRecipe {
  /**
   * @returns {number} The version number of the recipe.
   */
  get versionNumber(): number;
}

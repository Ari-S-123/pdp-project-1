import IRecipe from "./IRecipe";

/**
 * @interface IStep
 * @description Represents a step in a recipe.
 */
export default interface IStep {
  /**
   * @returns {IRecipe} The recipe that the step belongs to.
   */
  get recipe(): IRecipe;

  /**
   * @returns {number} The number of the step.
   */
  get stepNumber(): number;

  /**
   * @returns {string} The description of the step.
   */
  get description(): string;

  /**
   * @description Sets the description of the step.
   * @param {string} description The description of the step.
   */
  set description(description: string);
}

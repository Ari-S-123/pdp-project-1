import IStep from "../interfaces/IStep";
import IRecipe from "../interfaces/IRecipe";
/**
 * @class Step
 * @implements {IStep}
 * @description Implementation of a step in a recipe's preparation instructions.
 */
export class Step implements IStep {
  private readonly _recipe: IRecipe;
  private _stepNumber: number;
  private _description: string;

  /**
   * @constructor
   * @param {IRecipe} recipe - The recipe this step belongs to.
   * @param {number} stepNumber - The order number of this step in the recipe.
   * @param {string} description - The description of what to do in this step.
   */
  public constructor(recipe: IRecipe, stepNumber: number, description: string) {
    this._recipe = recipe;
    this._stepNumber = stepNumber;
    this._description = description;
  }

  /**
   * @returns {IRecipe} The recipe this step belongs to.
   */
  public get recipe(): IRecipe {
    return this._recipe;
  }

  /**
   * @returns {number} The order number of this step in the recipe.
   */
  public get stepNumber(): number {
    return this._stepNumber;
  }

  /**
   * @returns {string} The description of what to do in this step.
   */
  public get description(): string {
    return this._description;
  }
  /**
   * @param {string} description The new description of what to do in this step.
   */
  public set description(description: string) {
    if (!description) {
      throw new Error("No description provided.");
    }
    this._description = description;
  }
}

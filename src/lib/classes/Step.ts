import IStep from "../interfaces/IStep";

/**
 * @class Step
 * @implements {IStep}
 * @description Implementation of a step in a recipe's preparation instructions.
 */
export class Step implements IStep {
  private _recipeId: string;
  private _stepNumber: number;
  private _description: string;

  /**
   * @constructor
   * @param {string} recipeId - The ID of the recipe this step belongs to.
   * @param {number} stepNumber - The order number of this step in the recipe.
   * @param {string} description - The description of what to do in this step.
   */
  constructor(recipeId: string, stepNumber: number, description: string) {
    this._recipeId = recipeId;
    this._stepNumber = stepNumber;
    this._description = description;
  }

  /**
   * @returns {string} The ID of the recipe this step belongs to.
   */
  get recipeId(): string {
    return this._recipeId;
  }

  /**
   * @returns {number} The order number of this step in the recipe.
   */
  get stepNumber(): number {
    return this._stepNumber;
  }

  /**
   * @returns {string} The description of what to do in this step.
   */
  get description(): string {
    return this._description;
  }
  /**
   * @param {string} description The new description of what to do in this step.
   */
  set description(description: string) {
    this._description = description;
  }
}

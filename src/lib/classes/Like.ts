import ILike from "../interfaces/ILike";

/**
 * @class Like
 * @implements {ILike}
 * @description Implementation of a like relationship between a user and a recipe.
 */
export class Like implements ILike {
  private _recipeId: string;
  private _userId: string;
  private _timeCreated: Date;

  /**
   * @constructor
   * @param {string} recipeId - The ID of the recipe that was liked.
   * @param {string} userId - The ID of the user who liked the recipe.
   * @param {Date} timeCreated - The timestamp when the recipe was liked.
   */
  constructor(recipeId: string, userId: string, timeCreated: Date) {
    this._recipeId = recipeId;
    this._userId = userId;
    this._timeCreated = timeCreated;
  }

  /**
   * @returns {string} The ID of the recipe that was liked.
   */
  get recipeId(): string {
    return this._recipeId;
  }

  /**
   * @returns {string} The ID of the user who liked the recipe.
   */
  get userId(): string {
    return this._userId;
  }

  /**
   * @returns {Date} The timestamp when the recipe was liked.
   */
  get timeCreated(): Date {
    return this._timeCreated;
  }
}

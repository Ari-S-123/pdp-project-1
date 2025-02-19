import IFavorite from "../interfaces/IFavorite";

/**
 * @class Favorite
 * @implements {IFavorite}
 * @description Implementation of a favorite relationship between a user and a recipe.
 */
export class Favorite implements IFavorite {
  private _recipeId: string;
  private _userId: string;
  private _timeCreated: Date;

  /**
   * @constructor
   * @param {string} recipeId - The ID of the recipe that was favorited.
   * @param {string} userId - The ID of the user who favorited the recipe.
   * @param {Date} timeCreated - The timestamp when the recipe was favorited.
   */
  constructor(recipeId: string, userId: string, timeCreated: Date) {
    this._recipeId = recipeId;
    this._userId = userId;
    this._timeCreated = timeCreated;
  }

  /**
   * @returns {string} The ID of the recipe that was favorited.
   */
  get recipeId(): string {
    return this._recipeId;
  }

  /**
   * @returns {string} The ID of the user who favorited the recipe.
   */
  get userId(): string {
    return this._userId;
  }

  /**
   * @returns {Date} The timestamp when the recipe was favorited.
   */
  get timeCreated(): Date {
    return this._timeCreated;
  }
}

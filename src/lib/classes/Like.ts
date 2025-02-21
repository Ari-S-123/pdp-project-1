import ILike from "../interfaces/ILike";
import IRecipe from "../interfaces/IRecipe";
import IUser from "../interfaces/IUser";

/**
 * @class Like
 * @implements {ILike}
 * @description Implementation of a like relationship between a user and a recipe.
 */
export class Like implements ILike {
  private _recipe: IRecipe;
  private _user: IUser;
  private _timeCreated: Date;

  /**
   * @constructor
   * @param {IRecipe} recipe - The recipe that was liked.
   * @param {IUser} user - The user who liked the recipe.
   * @param {Date} timeCreated - The timestamp when the recipe was liked.
   */
  public constructor(recipe: IRecipe, user: IUser, timeCreated: Date) {
    this._recipe = recipe;
    this._user = user;
    this._timeCreated = timeCreated;
  }

  /**
   * @returns {IRecipe} The recipe that was liked.
   */
  public get recipe(): IRecipe {
    return this._recipe;
  }

  /**
   * @returns {IUser} The user who liked the recipe.
   */
  public get user(): IUser {
    return this._user;
  }

  /**
   * @returns {Date} The timestamp when the recipe was liked.
   */
  public get timeCreated(): Date {
    return this._timeCreated;
  }
}

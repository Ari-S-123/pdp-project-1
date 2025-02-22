import type ILike from "../interfaces/ILike";
import type IRecipe from "../interfaces/IRecipe";
import type IUser from "../interfaces/IUser";

/**
 * @class Like
 * @implements {ILike}
 * @description Implementation of a like relationship between a user and a recipe.
 */
export class Like implements ILike {
  private readonly _recipe: IRecipe;
  private readonly _user: IUser;
  private readonly _timeCreated: Date;

  /**
   * @constructor
   * @param {IRecipe} recipe - The recipe that was liked.
   * @param {IUser} user - The user who liked the recipe.
   */
  public constructor(recipe: IRecipe, user: IUser) {
    if (!recipe) {
      throw new Error("Recipe is not set");
    }
    if (!user) {
      throw new Error("User is not set");
    }
    this._recipe = recipe;
    this._user = user;
    this._timeCreated = new Date();
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

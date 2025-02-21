import IFavorite from "../interfaces/IFavorite";
import IRecipe from "../interfaces/IRecipe";
import IUser from "../interfaces/IUser";

/**
 * @class Favorite
 * @implements {IFavorite}
 * @description Implementation of a favorite relationship between a user and a recipe.
 */
export class Favorite implements IFavorite {
  private readonly _recipe: IRecipe;
  private readonly _user: IUser;
  private readonly _timeCreated: Date;

  /**
   * @constructor
   * @param {IRecipe} recipe - The recipe that was favorited.
   * @param {IUser} user - The user who favorited the recipe.
   */
  public constructor(recipe: IRecipe, user: IUser) {
    this._recipe = recipe;
    this._user = user;
    this._timeCreated = new Date();
  }

  /**
   * @returns {IRecipe} The recipe that was favorited.
   */
  public get recipe(): IRecipe {
    return this._recipe;
  }

  /**
   * @returns {IUser} The user who favorited the recipe.
   */
  public get user(): IUser {
    return this._user;
  }

  /**
   * @returns {Date} The timestamp when the recipe was favorited.
   */
  public get timeCreated(): Date {
    return this._timeCreated;
  }
}

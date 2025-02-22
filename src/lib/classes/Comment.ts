import type IComment from "../interfaces/IComment";
import type IRecipe from "../interfaces/IRecipe";
import type IUser from "../interfaces/IUser";

/**
 * @class Comment
 * @implements {IComment}
 * @description Implementation of a comment on a recipe.
 */
export class Comment implements IComment {
  private readonly _recipe: IRecipe;
  private readonly _user: IUser;
  private _text: string;
  private readonly _timeCreated: Date;
  private _timeLastEdited: Date;

  /**
   * @constructor
   * @param {IRecipe} recipe - The recipe the comment belongs to.
   * @param {IUser} user - The user who made the comment.
   * @param {string} text - The content of the comment.
   */
  public constructor(recipe: IRecipe, user: IUser, text: string) {
    if (!recipe) {
      throw new Error("Recipe is not set");
    }
    if (!user) {
      throw new Error("User is not set");
    }
    if (!text) {
      throw new Error("Text is not set");
    }
    this._recipe = recipe;
    this._user = user;
    this._text = text;
    this._timeCreated = new Date();
    this._timeLastEdited = this._timeCreated;
  }

  /**
   * @returns {IRecipe} The recipe the comment belongs to.
   */
  public get recipe(): IRecipe {
    return this._recipe;
  }

  /**
   * @returns {IUser} The user who made the comment.
   */
  public get user(): IUser {
    return this._user;
  }

  /**
   * @returns {string} The content of the comment.
   */
  public get text(): string {
    return this._text;
  }
  /**
   * @param {string} text The new content of the comment.
   */
  public set text(text: string) {
    if (!text) {
      throw new Error("No text provided.");
    }
    this._text = text;
  }

  /**
   * @returns {Date} The creation timestamp of the comment.
   */
  public get timeCreated(): Date {
    return this._timeCreated;
  }

  /**
   * @returns {Date} The timestamp of the last edit to the comment.
   */
  public get timeLastEdited(): Date {
    return this._timeLastEdited;
  }
  /**
   * @param {Date} timeLastEdited The new timestamp of the last edit to the comment.
   */
  public set timeLastEdited(timeLastEdited: Date) {
    if (!timeLastEdited) {
      throw new Error("No timestamp provided.");
    }
    this._timeLastEdited = timeLastEdited;
  }
}

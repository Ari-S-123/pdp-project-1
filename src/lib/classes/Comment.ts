import IComment from "../interfaces/IComment";
import IRecipe from "../interfaces/IRecipe";
import IUser from "../interfaces/IUser";

/**
 * @class Comment
 * @implements {IComment}
 * @description Implementation of a comment on a recipe.
 */
export class Comment implements IComment {
  private _recipe: IRecipe;
  private _user: IUser;
  private _text: string;
  private _timeCreated: Date;
  private _timeLastEdited: Date;

  /**
   * @constructor
   * @param {IRecipe} recipe - The recipe the comment belongs to.
   * @param {IUser} user - The user who made the comment.
   * @param {string} text - The content of the comment.
   * @param {Date} timeCreated - The creation timestamp of the comment.
   * @param {Date} timeLastEdited - The timestamp of the last edit to the comment.
   */
  constructor(recipe: IRecipe, user: IUser, text: string, timeCreated: Date, timeLastEdited: Date) {
    this._recipe = recipe;
    this._user = user;
    this._text = text;
    this._timeCreated = timeCreated;
    this._timeLastEdited = timeLastEdited;
  }

  /**
   * @returns {IRecipe} The recipe the comment belongs to.
   */
  get recipe(): IRecipe {
    return this._recipe;
  }

  /**
   * @returns {IUser} The user who made the comment.
   */
  get user(): IUser {
    return this._user;
  }

  /**
   * @returns {string} The content of the comment.
   */
  get text(): string {
    return this._text;
  }
  /**
   * @param {string} text The new content of the comment.
   */
  set text(text: string) {
    if (!text) {
      throw new Error("No text provided.");
    }
    this._text = text;
  }

  /**
   * @returns {Date} The creation timestamp of the comment.
   */
  get timeCreated(): Date {
    return this._timeCreated;
  }

  /**
   * @returns {Date} The timestamp of the last edit to the comment.
   */
  get timeLastEdited(): Date {
    return this._timeLastEdited;
  }
  /**
   * @param {Date} timeLastEdited The new timestamp of the last edit to the comment.
   */
  set timeLastEdited(timeLastEdited: Date) {
    if (!timeLastEdited) {
      throw new Error("No timestamp provided.");
    }
    this._timeLastEdited = timeLastEdited;
  }
}

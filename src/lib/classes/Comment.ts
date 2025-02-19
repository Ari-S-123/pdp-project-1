import IComment from "../interfaces/IComment";

/**
 * @class Comment
 * @implements {IComment}
 * @description Implementation of a comment on a recipe.
 */
export class Comment implements IComment {
  private _recipeId: string;
  private _userId: string;
  private _text: string;
  private _timeCreated: Date;
  private _timeLastEdited: Date;

  /**
   * @constructor
   * @param {string} recipeId - The ID of the recipe the comment belongs to.
   * @param {string} userId - The ID of the user who made the comment.
   * @param {string} text - The content of the comment.
   * @param {Date} timeCreated - The creation timestamp of the comment.
   * @param {Date} timeLastEdited - The timestamp of the last edit to the comment.
   */
  constructor(recipeId: string, userId: string, text: string, timeCreated: Date, timeLastEdited: Date) {
    this._recipeId = recipeId;
    this._userId = userId;
    this._text = text;
    this._timeCreated = timeCreated;
    this._timeLastEdited = timeLastEdited;
  }

  /**
   * @returns {string} The ID of the recipe the comment belongs to.
   */
  get recipeId(): string {
    return this._recipeId;
  }

  /**
   * @returns {string} The ID of the user who made the comment.
   */
  get userId(): string {
    return this._userId;
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
    this._timeLastEdited = timeLastEdited;
  }
}

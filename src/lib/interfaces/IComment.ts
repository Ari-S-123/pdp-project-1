import type IRecipe from "./IRecipe";
import type IUser from "./IUser";

/**
 * @interface IComment
 * @description Represents a comment on a recipe.
 */
export default interface IComment {
  /**
   * @returns {IRecipe} The recipe that the comment belongs to.
   */
  get recipe(): IRecipe;

  /**
   * @returns {IUser} The user that made the comment.
   */
  get user(): IUser;

  /**
   * @returns {string} The text of the comment.
   */
  get text(): string;

  /**
   * @returns {Date} The date and time the comment was created.
   */
  get timeCreated(): Date;

  /**
   * @returns {Date} The date and time the comment was last edited.
   */
  get timeLastEdited(): Date;

  /**
   * @param {string} text The text of the comment.
   */
  set text(text: string);

  /**
   * @param {Date} timeLastEdited The date and time the comment was last edited.
   */
  set timeLastEdited(timeLastEdited: Date);
}

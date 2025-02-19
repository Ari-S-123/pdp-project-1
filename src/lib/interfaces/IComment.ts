/**
 * @interface IComment
 * @description Represents a comment on a recipe.
 */
export default interface IComment {
  /**
   * @returns {string} The ID of the recipe that the comment belongs to.
   */
  get recipeId(): string;

  /**
   * @returns {string} The ID of the user that made the comment.
   */
  get userId(): string;

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

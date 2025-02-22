import { TasteProfile } from "../enums/TasteProfile";
import { Visibility } from "../enums/Visibility";
import type IIngredient from "./IIngredient";
import type IStep from "./IStep";
import type IUser from "./IUser";

/**
 * @interface IRecipe
 * @description Represents a recipe.
 */
export default interface IRecipe {
  /**
   * @returns {IUser} The creator of the recipe.
   */
  get creator(): IUser;

  /**
   * @returns {string} The title of the recipe.
   */
  get title(): string;

  /**
   * @returns {TasteProfile[]} The taste profiles of the recipe.
   */
  get tasteProfiles(): TasteProfile[];

  /**
   * @returns {boolean} Whether the recipe is visible to the public.
   */
  get visibility(): boolean;

  /**
   * @returns {Date} The date and time the recipe was created.
   */
  get timeCreated(): Date;

  /**
   * @returns {string} The description of the recipe.
   */
  get description(): string;

  /**
   * @returns {Date} The date and time the recipe was last updated.
   */
  get timeLastUpdated(): Date;

  /**
   * @returns {IIngredient[]} The ingredients of the recipe.
   */
  get ingredients(): IIngredient[];

  /**
   * @returns {IStep[]} The steps of the recipe.
   */
  get steps(): IStep[];

  /**
   * @description Sets the title of the recipe.
   * @param {string} title The title of the recipe.
   */
  set title(title: string);

  /**
   * @description Sets the description of the recipe.
   * @param {string} description The description of the recipe.
   */
  set description(description: string);

  /**
   * @description Sets the taste profiles of the recipe.
   * @param {TasteProfile[]} tasteProfiles The taste profiles of the recipe.
   */
  set tasteProfiles(tasteProfiles: TasteProfile[]);

  /**
   * @description Sets the visibility of the recipe.
   * @param {Visibility} visibility The visibility of the recipe.
   */
  set visibility(visibility: Visibility);

  /**
   * @description Sets the date and time the recipe was last updated.
   * @param {Date} timeLastUpdated The date and time the recipe was last updated.
   */
  set timeLastUpdated(timeLastUpdated: Date);

  /**
   * @description Sets the ingredients of the recipe.
   * @param {IIngredient[]} ingredients The ingredients of the recipe.
   */
  set ingredients(ingredients: IIngredient[]);

  /**
   * @description Sets the steps of the recipe.
   * @param {IStep[]} steps The steps of the recipe.
   */
  set steps(steps: IStep[]);

  /**
   * @description Calculates the BAC of the user after consuming the recipe.
   * @param {IUser} user The user.
   * @returns {number} The BAC of the user after consuming the recipe.
   */
  calculateBAC(user: IUser): number;
}

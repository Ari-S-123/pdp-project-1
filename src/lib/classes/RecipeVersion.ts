import { Recipe } from "./Recipe";
import IRecipeVersion from "../interfaces/IRecipeVersion";
import { TasteProfile } from "../enums/TasteProfile";
import { Visibility } from "../enums/Visibility";
import IIngredient from "../interfaces/IIngredient";
import IStep from "../interfaces/IStep";
import IUser from "../interfaces/IUser";

/**
 * @class RecipeVersion
 * @extends {Recipe}
 * @implements {IRecipeVersion}
 * @description Implementation of a recipe version that extends the base recipe with version tracking.
 */
export class RecipeVersion extends Recipe implements IRecipeVersion {
  private _versionNumber: number;

  /**
   * @constructor
   * @param {IUser} creator - The creator of the recipe.
   * @param {string} title - The title of the recipe.
   * @param {TasteProfile[]} tasteProfiles - The taste profiles of the recipe.
   * @param {Visibility} visibility - The visibility setting of the recipe.
   * @param {Date} timeCreated - The creation timestamp of the recipe.
   * @param {string} description - The description of the recipe.
   * @param {Date} timeLastUpdated - The last update timestamp of the recipe.
   * @param {number} versionNumber - The version number of this recipe version.
   * @param {IIngredient[]} [ingredients=[]] - The ingredients of the recipe.
   * @param {IStep[]} [steps=[]] - The steps of the recipe.
   */
  public constructor(
    creator: IUser,
    title: string,
    tasteProfiles: TasteProfile[],
    visibility: Visibility,
    timeCreated: Date,
    description: string,
    timeLastUpdated: Date,
    versionNumber: number,
    ingredients: IIngredient[] = [],
    steps: IStep[] = []
  ) {
    super(creator, title, tasteProfiles, visibility, timeCreated, description, timeLastUpdated, ingredients, steps);
    this._versionNumber = versionNumber;
  }

  /**
   * @returns {number} The version number of this recipe version.
   */
  public get versionNumber(): number {
    return this._versionNumber;
  }
}

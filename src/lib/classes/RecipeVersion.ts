import { Recipe } from "./Recipe";
import type IRecipeVersion from "../interfaces/IRecipeVersion";
import type { TasteProfile } from "../enums/TasteProfile";
import type { Visibility } from "../enums/Visibility";
import type IIngredient from "../interfaces/IIngredient";
import type IStep from "../interfaces/IStep";
import type IUser from "../interfaces/IUser";

/**
 * @class RecipeVersion
 * @extends {Recipe}
 * @implements {IRecipeVersion}
 * @description Implementation of a recipe version that extends the base recipe with version tracking.
 */
export class RecipeVersion extends Recipe implements IRecipeVersion {
  private readonly _versionNumber: number;

  /**
   * @constructor
   * @param {IUser} creator - The creator of the recipe.
   * @param {string} title - The title of the recipe.
   * @param {TasteProfile[]} tasteProfiles - The taste profiles of the recipe.
   * @param {Visibility} visibility - The visibility setting of the recipe.
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
    description: string,
    timeLastUpdated: Date,
    versionNumber: number,
    ingredients: IIngredient[] = [],
    steps: IStep[] = []
  ) {
    super(creator, title, tasteProfiles, visibility, description, timeLastUpdated, ingredients, steps);
    if (versionNumber <= 0) {
      throw new Error("Version number must be greater than 0");
    }
    this._versionNumber = versionNumber;
  }

  /**
   * @returns {number} The version number of this recipe version.
   */
  public get versionNumber(): number {
    return this._versionNumber;
  }
}

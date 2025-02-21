import IRecipe from "../interfaces/IRecipe";
import IIngredient from "../interfaces/IIngredient";
import IStep from "../interfaces/IStep";
import { TasteProfile } from "../enums/TasteProfile";
import { Visibility } from "../enums/Visibility";
import IUser from "../interfaces/IUser";
import { BiologicalSex } from "../enums/BiologicalSex";

/**
 * @class Recipe
 * @implements {IRecipe}
 * @description Implementation of a recipe with all its properties and methods.
 */
export class Recipe implements IRecipe {
  private readonly _creator: IUser;
  private _title: string;
  private _tasteProfiles: TasteProfile[];
  private _visibility: Visibility;
  private readonly _timeCreated: Date;
  private _description?: string;
  private _timeLastUpdated: Date;
  private _ingredients: IIngredient[] = [];
  private _steps: IStep[] = [];

  /**
   * @constructor
   * @param {IUser} creator - The creator of the recipe.
   * @param {string} title - The title of the recipe.
   * @param {TasteProfile[]} tasteProfiles - The taste profiles of the recipe.
   * @param {Visibility} visibility - The visibility setting of the recipe.
   * @param {string} description - The description of the recipe.
   * @param {Date} timeLastUpdated - The last update timestamp of the recipe.
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
    ingredients: IIngredient[] = [],
    steps: IStep[] = []
  ) {
    this._creator = creator;
    this._title = title;
    this._tasteProfiles = tasteProfiles;
    this._visibility = visibility;
    this._timeCreated = new Date();
    this._description = description;
    this._timeLastUpdated = timeLastUpdated;
    this._ingredients = ingredients;
    this._steps = steps;
  }

  /**
   * @returns {IUser} The creator of the recipe.
   */
  public get creator(): IUser {
    return this._creator;
  }

  /**
   * @returns {string} The title of the recipe.
   */
  public get title(): string {
    return this._title;
  }
  /**
   * @param {string} title The new title of the recipe.
   */
  public set title(title: string) {
    this._title = title;
  }

  /**
   * @returns {TasteProfile[]} The taste profiles of the recipe.
   */
  public get tasteProfiles(): TasteProfile[] {
    return this._tasteProfiles;
  }
  /**
   * @param {TasteProfile[]} tasteProfiles The new taste profiles of the recipe.
   */
  public set tasteProfiles(tasteProfiles: TasteProfile[]) {
    this._tasteProfiles = tasteProfiles;
  }

  /**
   * @returns {boolean} Whether the recipe is visible to the public.
   */
  public get visibility(): boolean {
    return this._visibility === Visibility.PUBLIC;
  }
  /**
   * @param {Visibility} visibility The new visibility setting of the recipe.
   */
  public set visibility(visibility: Visibility) {
    this._visibility = visibility;
  }

  /**
   * @returns {Date} The creation timestamp of the recipe.
   */
  public get timeCreated(): Date {
    return this._timeCreated;
  }

  /**
   * @returns {string} The description of the recipe.
   */
  public get description(): string {
    if (!this._description) {
      throw new Error("Description is not set");
    }
    return this._description;
  }
  /**
   * @param {string} description The new description of the recipe.
   */
  public set description(description: string) {
    this._description = description;
  }

  /**
   * @returns {Date} The last update timestamp of the recipe.
   */
  public get timeLastUpdated(): Date {
    return this._timeLastUpdated;
  }
  /**
   * @param {Date} timeLastUpdated The new last update timestamp of the recipe.
   */
  public set timeLastUpdated(timeLastUpdated: Date) {
    this._timeLastUpdated = timeLastUpdated;
  }

  /**
   * @returns {IIngredient[]} The ingredients of the recipe.
   */
  public get ingredients(): IIngredient[] {
    return this._ingredients;
  }

  /**
   * @returns {IStep[]} The steps of the recipe.
   */
  public get steps(): IStep[] {
    return this._steps;
  }
  /**
   * @param {IStep[]} steps The new steps of the recipe.
   */
  public set steps(steps: IStep[]) {
    this._steps = steps;
  }

  /**
   * @description Calculates the Blood Alcohol Content for a user after consuming this recipe.
   * Calculate using the Widmark Equation
   * (Dose in grams/(Body weight in grams x Distribution ratio "r"))x100 where r(male)=.68 r(female)=.55 and assuming an average constant rate of -0.016 BAC per hour.
   * @param {IUser} user The user to calculate BAC for.
   * @returns {number} The calculated BAC value.
   */
  public calculateBAC(user: IUser): number {
    const doseInGrams = this.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.volumeInMl * ingredient.abv;
    }, 0);
    const bodyWeightInGrams = user.weightInKg * 1000;
    const distributionRatio = user.biologicalSex === BiologicalSex.MALE ? 0.68 : 0.55;
    return (doseInGrams / (bodyWeightInGrams * distributionRatio)) * 100 * -0.016;
  }
}

import IRecipe from "../interfaces/IRecipe";
import IIngredient from "../interfaces/IIngredient";
import IStep from "../interfaces/IStep";
import { TasteProfile } from "../enums/TasteProfile";
import { Visibility } from "../enums/Visibility";
import { User } from "./User";

/**
 * @class Recipe
 * @implements {IRecipe}
 * @description Implementation of a recipe with all its properties and methods.
 */
export class Recipe implements IRecipe {
  private _creatorUserId: string;
  private _title: string;
  private _tasteProfiles: TasteProfile[];
  private _visibility: Visibility;
  private _timeCreated: Date;
  private _description: string;
  private _timeLastUpdated: Date;
  private _ingredients: IIngredient[];
  private _steps: IStep[];

  /**
   * @constructor
   * @param {string} creatorUserId - The ID of the creator of the recipe.
   * @param {string} title - The title of the recipe.
   * @param {TasteProfile[]} tasteProfiles - The taste profiles of the recipe.
   * @param {Visibility} visibility - The visibility setting of the recipe.
   * @param {Date} timeCreated - The creation timestamp of the recipe.
   * @param {string} description - The description of the recipe.
   * @param {Date} timeLastUpdated - The last update timestamp of the recipe.
   * @param {IIngredient[]} [ingredients=[]] - The ingredients of the recipe.
   * @param {IStep[]} [steps=[]] - The steps of the recipe.
   */
  constructor(
    creatorUserId: string,
    title: string,
    tasteProfiles: TasteProfile[],
    visibility: Visibility,
    timeCreated: Date,
    description: string,
    timeLastUpdated: Date,
    ingredients: IIngredient[] = [],
    steps: IStep[] = []
  ) {
    this._creatorUserId = creatorUserId;
    this._title = title;
    this._tasteProfiles = tasteProfiles;
    this._visibility = visibility;
    this._timeCreated = timeCreated;
    this._description = description;
    this._timeLastUpdated = timeLastUpdated;
    this._ingredients = ingredients;
    this._steps = steps;
  }

  /**
   * @returns {string} The ID of the creator of the recipe.
   */
  get creatorUserId(): string {
    return this._creatorUserId;
  }

  /**
   * @returns {string} The title of the recipe.
   */
  get title(): string {
    return this._title;
  }
  /**
   * @param {string} title The new title of the recipe.
   */
  set title(title: string) {
    this._title = title;
  }

  /**
   * @returns {TasteProfile[]} The taste profiles of the recipe.
   */
  get tasteProfiles(): TasteProfile[] {
    return this._tasteProfiles;
  }
  /**
   * @param {TasteProfile[]} tasteProfiles The new taste profiles of the recipe.
   */
  set tasteProfiles(tasteProfiles: TasteProfile[]) {
    this._tasteProfiles = tasteProfiles;
  }

  /**
   * @returns {boolean} Whether the recipe is visible to the public.
   */
  get visibility(): boolean {
    return this._visibility === Visibility.PUBLIC;
  }
  /**
   * @param {Visibility} visibility The new visibility setting of the recipe.
   */
  set visibility(visibility: Visibility) {
    this._visibility = visibility;
  }

  /**
   * @returns {Date} The creation timestamp of the recipe.
   */
  get timeCreated(): Date {
    return this._timeCreated;
  }

  /**
   * @returns {string} The description of the recipe.
   */
  get description(): string {
    return this._description;
  }
  /**
   * @param {string} description The new description of the recipe.
   */
  set description(description: string) {
    this._description = description;
  }

  /**
   * @returns {Date} The last update timestamp of the recipe.
   */
  get timeLastUpdated(): Date {
    return this._timeLastUpdated;
  }
  /**
   * @param {Date} timeLastUpdated The new last update timestamp of the recipe.
   */
  set timeLastUpdated(timeLastUpdated: Date) {
    this._timeLastUpdated = timeLastUpdated;
  }

  /**
   * @returns {IIngredient[]} The ingredients of the recipe.
   */
  get ingredients(): IIngredient[] {
    return this._ingredients;
  }

  /**
   * @returns {IStep[]} The steps of the recipe.
   */
  get steps(): IStep[] {
    return this._steps;
  }
  /**
   * @param {IStep[]} steps The new steps of the recipe.
   */
  set steps(steps: IStep[]) {
    this._steps = steps;
  }

  /**
   * @description Calculates the Blood Alcohol Content for a user after consuming this recipe.
   * Calculate using the Widmark Equation
   * (Dose in grams/(Body weight in grams x Distribution ratio "r"))x100 where r(male)=.68 r(female)=.55 and assuming an average constant rate of -0.016 BAC per hour.
   * @param {string} userId The ID of the user to calculate BAC for.
   * @returns {number} The calculated BAC value.
   */
  calculateBAC(userId: string): number {
    // TODO: Implement BAC calculation, needs to be refactored to use User instance instead of userId
    // temporary example user
    let exampleUser = new User(
      "123",
      "John Doe",
      "password",
      false,
      new Date(),
      "12345",
      "male",
      70,
      "john.doe@example.com",
      "1234567890",
      "https://example.com/profile.jpg",
      [],
      [],
      []
    );

    const doseInGrams = this.ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.volumeInMl * ingredient.abv;
    }, 0);

    const bodyWeightInGrams = exampleUser.weightInKg * 1000;
    const distributionRatio = exampleUser.biologicalSex === "male" ? 0.68 : 0.55;

    const bac = (doseInGrams / (bodyWeightInGrams * distributionRatio)) * 100 * -0.016;

    return bac;
  }
}

import IIngredient from "../interfaces/IIngredient";

/**
 * @class Ingredient
 * @implements {IIngredient}
 * @description Implementation of an ingredient in a recipe.
 */
export class Ingredient implements IIngredient {
  private _recipeId: string;
  private _name: string;
  private _volumeInMl: number;
  private _abv: number;

  /**
   * @constructor
   * @param {string} recipeId - The ID of the recipe this ingredient belongs to.
   * @param {string} name - The name of the ingredient.
   * @param {number} volumeInMl - The volume of the ingredient in milliliters.
   * @param {number} abv - The alcohol by volume percentage of the ingredient.
   */
  constructor(recipeId: string, name: string, volumeInMl: number, abv: number) {
    this._recipeId = recipeId;
    this._name = name;
    this._volumeInMl = volumeInMl;
    this._abv = abv;
  }

  /**
   * @returns {string} The ID of the recipe this ingredient belongs to.
   */
  get recipeId(): string {
    return this._recipeId;
  }

  /**
   * @returns {string} The name of the ingredient.
   */
  get name(): string {
    return this._name;
  }
  /**
   * @param {string} name The new name of the ingredient.
   */
  set name(name: string) {
    this._name = name;
  }

  /**
   * @returns {number} The volume of the ingredient in milliliters.
   */
  get volumeInMl(): number {
    return this._volumeInMl;
  }
  /**
   * @param {number} volumeInMl The new volume of the ingredient in milliliters.
   */
  set volumeInMl(volumeInMl: number) {
    this._volumeInMl = volumeInMl;
  }

  /**
   * @returns {number} The alcohol by volume percentage of the ingredient.
   */
  get abv(): number {
    return this._abv;
  }
  /**
   * @param {number} abv The new alcohol by volume percentage of the ingredient.
   */
  set abv(abv: number) {
    this._abv = abv;
  }

  /**
   * @description Finds a local source where this ingredient can be purchased.
   * @returns {string} The name or location of a local source for this ingredient.
   */
  findLocalSource(): string {
    // Placeholder implementation
    return "Local store";
  }
}

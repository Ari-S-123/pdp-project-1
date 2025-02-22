import type IIngredient from "../interfaces/IIngredient";
import type IRecipe from "../interfaces/IRecipe";

/**
 * @class Ingredient
 * @implements {IIngredient}
 * @description Implementation of an ingredient in a recipe.
 */
export class Ingredient implements IIngredient {
  private readonly _recipe: IRecipe;
  private _name: string;
  private _volumeInMl: number;
  private _abv: number;

  /**
   * @constructor
   * @param {IRecipe} recipe - The recipe this ingredient belongs to.
   * @param {string} name - The name of the ingredient.
   * @param {number} volumeInMl - The volume of the ingredient in milliliters.
   * @param {number} abv - The alcohol by volume percentage of the ingredient.
   */
  public constructor(recipe: IRecipe, name: string, volumeInMl: number, abv: number) {
    if (!recipe) {
      throw new Error("Recipe is not set");
    }
    if (!name) {
      throw new Error("Name is not set");
    }
    if (volumeInMl < 0) {
      throw new Error("Volume in milliliters cannot be negative.");
    }
    if (abv < 0 || abv > 100) {
      throw new Error("Invalid alcohol by volume percentage.");
    }
    this._recipe = recipe;
    this._name = name;
    this._volumeInMl = volumeInMl;
    this._abv = abv;
  }

  /**
   * @returns {IRecipe} The recipe this ingredient belongs to.
   */
  public get recipe(): IRecipe {
    return this._recipe;
  }

  /**
   * @returns {string} The name of the ingredient.
   */
  public get name(): string {
    return this._name;
  }
  /**
   * @param {string} name The new name of the ingredient.
   */
  public set name(name: string) {
    if (!name) {
      throw new Error("No name provided.");
    }
    this._name = name;
  }

  /**
   * @returns {number} The volume of the ingredient in milliliters.
   */
  public get volumeInMl(): number {
    return this._volumeInMl;
  }
  /**
   * @param {number} volumeInMl The new volume of the ingredient in milliliters.
   */
  public set volumeInMl(volumeInMl: number) {
    if (volumeInMl < 0) {
      throw new Error("Volume in milliliters cannot be negative.");
    }
    this._volumeInMl = volumeInMl;
  }

  /**
   * @returns {number} The alcohol by volume percentage of the ingredient.
   */
  public get abv(): number {
    return this._abv;
  }
  /**
   * @param {number} abv The new alcohol by volume percentage of the ingredient.
   */
  public set abv(abv: number) {
    if (abv < 0 || abv > 100) {
      throw new Error("Invalid alcohol by volume percentage.");
    }
    this._abv = abv;
  }
}

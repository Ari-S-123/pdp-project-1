import { expect, test, describe } from "bun:test";
import { Ingredient } from "../../src/lib/classes/Ingredient";
import { Recipe } from "../../src/lib/classes/Recipe";
import { User } from "../../src/lib/classes/User";
import { BiologicalSex } from "../../src/lib/enums/BiologicalSex";
import { TasteProfile } from "../../src/lib/enums/TasteProfile";
import { Visibility } from "../../src/lib/enums/Visibility";

describe("Ingredient", () => {
  const creator = new User(
    "testuser",
    "password123",
    false,
    new Date("2024-02-21"),
    "12345",
    BiologicalSex.MALE,
    70,
    "test@example.com",
    "123-456-7890",
    "https://example.com/profile.jpg"
  );

  const recipe = new Recipe(
    creator,
    "Margarita",
    [TasteProfile.SOUR, TasteProfile.SWEET],
    Visibility.PUBLIC,
    new Date("2024-02-21"),
    "Classic margarita recipe",
    new Date("2024-02-21")
  );

  const testIngredient = new Ingredient(recipe, "Tequila", 60, 40);

  test("constructor creates ingredient with correct properties", () => {
    expect(testIngredient.recipe).toBe(recipe);
    expect(testIngredient.name).toBe("Tequila");
    expect(testIngredient.volumeInMl).toBe(60);
    expect(testIngredient.abv).toBe(40);
  });

  test("setters update properties correctly", () => {
    testIngredient.name = "Silver Tequila";
    expect(testIngredient.name).toBe("Silver Tequila");

    testIngredient.volumeInMl = 45;
    expect(testIngredient.volumeInMl).toBe(45);

    testIngredient.abv = 38;
    expect(testIngredient.abv).toBe(38);
  });

  test("setters throw errors for invalid values", () => {
    expect(() => {
      testIngredient.name = "";
    }).toThrow("No name provided.");

    expect(() => {
      testIngredient.volumeInMl = -1;
    }).toThrow("Volume in milliliters cannot be negative.");

    expect(() => {
      testIngredient.abv = -1;
    }).toThrow("Invalid alcohol by volume percentage.");

    expect(() => {
      testIngredient.abv = 101;
    }).toThrow("Invalid alcohol by volume percentage.");
  });

  test("ingredient properties remain unchanged after invalid updates", () => {
    const originalName = testIngredient.name;
    const originalVolume = testIngredient.volumeInMl;
    const originalAbv = testIngredient.abv;

    try {
      testIngredient.name = "";
    } catch {
      // Expected error
    }
    expect(testIngredient.name).toBe(originalName);

    try {
      testIngredient.volumeInMl = -1;
    } catch {
      // Expected error
    }
    expect(testIngredient.volumeInMl).toBe(originalVolume);

    try {
      testIngredient.abv = 101;
    } catch {
      // Expected error
    }
    expect(testIngredient.abv).toBe(originalAbv);
  });
});

import { expect, test, describe } from "bun:test";
import { Recipe } from "../../src/lib/classes/Recipe";
import { User } from "../../src/lib/classes/User";
import { BiologicalSex } from "../../src/lib/enums/BiologicalSex";
import { TasteProfile } from "../../src/lib/enums/TasteProfile";
import { Visibility } from "../../src/lib/enums/Visibility";
import { Ingredient } from "../../src/lib/classes/Ingredient";
import { Step } from "../../src/lib/classes/Step";

describe("Recipe", () => {
  const creator = new User(
    "testuser",
    "password123",
    false,
    "12345",
    BiologicalSex.MALE,
    70,
    "test@example.com",
    "123-456-7890",
    "https://example.com/profile.jpg"
  );

  const testRecipe = new Recipe(
    creator,
    "Margarita",
    [TasteProfile.SOUR, TasteProfile.SWEET],
    Visibility.PUBLIC,
    "Classic margarita recipe",
    new Date("2024-02-21")
  );

  test("constructor creates recipe with correct properties", () => {
    expect(testRecipe.creator).toBe(creator);
    expect(testRecipe.title).toBe("Margarita");
    expect(testRecipe.tasteProfiles).toEqual([TasteProfile.SOUR, TasteProfile.SWEET]);
    expect(testRecipe.visibility).toBe(true); // PUBLIC visibility
    expect(testRecipe.description).toBe("Classic margarita recipe");
    expect(testRecipe.timeLastUpdated).toEqual(new Date("2024-02-21"));
    expect(testRecipe.ingredients).toEqual([]);
    expect(testRecipe.steps).toEqual([]);
  });

  test("setters update properties correctly", () => {
    testRecipe.title = "Spicy Margarita";
    expect(testRecipe.title).toBe("Spicy Margarita");

    testRecipe.description = "Spicy twist on classic margarita";
    expect(testRecipe.description).toBe("Spicy twist on classic margarita");

    testRecipe.tasteProfiles = [TasteProfile.SOUR, TasteProfile.SWEET, TasteProfile.HOT];
    expect(testRecipe.tasteProfiles).toEqual([TasteProfile.SOUR, TasteProfile.SWEET, TasteProfile.HOT]);

    testRecipe.visibility = Visibility.FRIENDS_ONLY;
    expect(testRecipe.visibility).toBe(false);

    const newDate = new Date("2024-02-22");
    testRecipe.timeLastUpdated = newDate;
    expect(testRecipe.timeLastUpdated).toEqual(newDate);
  });

  test("ingredients management works correctly", () => {
    const tequila = new Ingredient(testRecipe, "Tequila", 60, 40);
    const limeJuice = new Ingredient(testRecipe, "Lime Juice", 30, 0);
    const tripleSec = new Ingredient(testRecipe, "Triple Sec", 30, 30);

    const recipeWithIngredients = new Recipe(
      creator,
      "Margarita",
      [TasteProfile.SOUR, TasteProfile.SWEET],
      Visibility.PUBLIC,
      "Classic margarita recipe",
      new Date("2024-02-21"),
      [tequila, limeJuice, tripleSec]
    );

    expect(recipeWithIngredients.ingredients).toEqual([tequila, limeJuice, tripleSec]);
    expect(recipeWithIngredients.ingredients.length).toBe(3);
  });

  test("steps management works correctly", () => {
    const step1 = new Step(testRecipe, 1, "Rim glass with salt");
    const step2 = new Step(testRecipe, 2, "Add ingredients to shaker with ice");
    const step3 = new Step(testRecipe, 3, "Shake well and strain into glass");

    testRecipe.steps = [step1, step2, step3];
    expect(testRecipe.steps).toEqual([step1, step2, step3]);
    expect(testRecipe.steps.length).toBe(3);
    expect(() => (testRecipe.steps = [step1, step2, step3, step3])).toThrow("Steps have duplicate step numbers");
  });

  test("BAC calculation works correctly", () => {
    const tequila = new Ingredient(testRecipe, "Tequila", 60, 40);
    const limeJuice = new Ingredient(testRecipe, "Lime Juice", 25, 0);

    const recipeWithIngredients = new Recipe(
      creator,
      "Margarita",
      [TasteProfile.SOUR, TasteProfile.SWEET],
      Visibility.PUBLIC,
      "Classic margarita recipe",
      new Date("2024-02-21"),
      [tequila, limeJuice]
    );

    const bac = recipeWithIngredients.calculateBAC(creator);
    expect(bac).toBeCloseTo(0.0398, 3);
  });

  test("description getter throws error when not set", () => {
    const recipeWithoutDesc = new Recipe(
      creator,
      "Test Recipe",
      [TasteProfile.SWEET],
      Visibility.PUBLIC,
      "",
      new Date()
    );

    expect(() => recipeWithoutDesc.description).toThrow("Description is not set");
  });
});

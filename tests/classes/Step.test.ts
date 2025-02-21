import { expect, test, describe } from "bun:test";
import { Step } from "../../src/lib/classes/Step";
import { Recipe } from "../../src/lib/classes/Recipe";
import { User } from "../../src/lib/classes/User";
import { BiologicalSex } from "../../src/lib/enums/BiologicalSex";
import { TasteProfile } from "../../src/lib/enums/TasteProfile";
import { Visibility } from "../../src/lib/enums/Visibility";

describe("Step", () => {
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

  const recipe = new Recipe(
    creator,
    "Margarita",
    [TasteProfile.SOUR, TasteProfile.SWEET],
    Visibility.PUBLIC,
    "Classic margarita recipe",
    new Date("2024-02-21")
  );

  const testStep = new Step(recipe, 1, "Rim glass with salt");

  test("constructor creates step with correct properties", () => {
    expect(testStep.recipe).toBe(recipe);
    expect(testStep.stepNumber).toBe(1);
    expect(testStep.description).toBe("Rim glass with salt");
  });

  test("description setter updates property correctly", () => {
    testStep.description = "Rim glass with pink himalayan salt";
    expect(testStep.description).toBe("Rim glass with pink himalayan salt");
  });

  test("description setter throws error for invalid value", () => {
    expect(() => {
      testStep.description = "";
    }).toThrow("No description provided.");
  });

  test("step properties throw errors for invalid updates", () => {
    expect(() => {
      testStep.description = "";
    }).toThrow("No description provided.");
  });

  test("step number is immutable", () => {
    const stepNumber = testStep.stepNumber;
    expect(stepNumber).toBe(1);
    // Verify that stepNumber is readonly by checking that there's no setter
    expect(Object.getOwnPropertyDescriptor(Step.prototype, "stepNumber")?.set).toBeUndefined();
  });

  test("recipe reference is immutable", () => {
    const stepRecipe = testStep.recipe;
    expect(stepRecipe).toBe(recipe);
    // Verify that recipe is readonly by checking that there's no setter
    expect(Object.getOwnPropertyDescriptor(Step.prototype, "recipe")?.set).toBeUndefined();
  });
});

import { expect, test, describe } from "bun:test";
import { RecipeVersion } from "../../src/lib/classes/RecipeVersion";
import { User } from "../../src/lib/classes/User";
import { BiologicalSex } from "../../src/lib/enums/BiologicalSex";
import { TasteProfile } from "../../src/lib/enums/TasteProfile";
import { Visibility } from "../../src/lib/enums/Visibility";
import { Ingredient } from "../../src/lib/classes/Ingredient";
import { Step } from "../../src/lib/classes/Step";
import { UserBuilder } from "../../src/lib/classes/UserBuilder";

describe("RecipeVersion", () => {
  const creator = new UserBuilder()
    .withUsername("creator")
    .withPassword("password123")
    .with2FAEnabled(false)
    .withZipCode("12345")
    .withBiologicalSex(BiologicalSex.MALE)
    .withWeightInKg(70)
    .withEmail("creator@example.com")
    .withPhoneNumber("123-456-7890")
    .withProfilePicUrl("https://example.com/creator.jpg")
    .build();

  const testRecipeVersion = new RecipeVersion(
    creator,
    "Margarita",
    [TasteProfile.SOUR, TasteProfile.SWEET],
    Visibility.PUBLIC,
    "Classic margarita recipe",
    new Date("2024-02-21"),
    1
  );

  test("constructor creates recipe version with correct properties", () => {
    expect(testRecipeVersion.creator).toBe(creator);
    expect(testRecipeVersion.title).toBe("Margarita");
    expect(testRecipeVersion.tasteProfiles).toEqual([TasteProfile.SOUR, TasteProfile.SWEET]);
    expect(testRecipeVersion.visibility).toBe(true); // PUBLIC visibility
    expect(testRecipeVersion.description).toBe("Classic margarita recipe");
    expect(testRecipeVersion.timeLastUpdated).toEqual(new Date("2024-02-21"));
    expect(testRecipeVersion.ingredients).toEqual([]);
    expect(testRecipeVersion.steps).toEqual([]);
    expect(testRecipeVersion.versionNumber).toBe(1);

    expect(
      () =>
        new RecipeVersion(
          undefined as unknown as User,
          "Margarita",
          [TasteProfile.SOUR, TasteProfile.SWEET],
          Visibility.PUBLIC,
          "Classic margarita recipe",
          new Date("2024-02-21"),
          1
        )
    ).toThrow("Creator is not set");
    expect(
      () =>
        new RecipeVersion(
          creator,
          "",
          [TasteProfile.SOUR, TasteProfile.SWEET],
          Visibility.PUBLIC,
          "Classic margarita recipe",
          new Date("2024-02-21"),
          1
        )
    ).toThrow("Title is not set");
    expect(
      () =>
        new RecipeVersion(
          creator,
          "Margarita",
          [TasteProfile.SOUR, TasteProfile.SWEET],
          Visibility.PUBLIC,
          "Classic margarita recipe",
          new Date("2024-02-21"),
          0
        )
    ).toThrow("Version number must be greater than 0");
  });

  test("inherits recipe functionality", () => {
    // Test that RecipeVersion inherits all Recipe functionality
    testRecipeVersion.title = "Spicy Margarita";
    expect(testRecipeVersion.title).toBe("Spicy Margarita");

    testRecipeVersion.description = "Spicy twist on classic margarita";
    expect(testRecipeVersion.description).toBe("Spicy twist on classic margarita");

    testRecipeVersion.tasteProfiles = [TasteProfile.SOUR, TasteProfile.SWEET, TasteProfile.HOT];
    expect(testRecipeVersion.tasteProfiles).toEqual([TasteProfile.SOUR, TasteProfile.SWEET, TasteProfile.HOT]);

    testRecipeVersion.visibility = Visibility.FRIENDS_ONLY;
    expect(testRecipeVersion.visibility).toBe(false);

    const newDate = new Date("2024-02-22");
    testRecipeVersion.timeLastUpdated = newDate;
    expect(testRecipeVersion.timeLastUpdated).toEqual(newDate);
  });

  test("ingredients management works correctly", () => {
    const tequila = new Ingredient(testRecipeVersion, "Tequila", 60, 40);
    const limeJuice = new Ingredient(testRecipeVersion, "Lime Juice", 30, 0);
    const tripleSec = new Ingredient(testRecipeVersion, "Triple Sec", 30, 30);

    const versionWithIngredients = new RecipeVersion(
      creator,
      "Margarita",
      [TasteProfile.SOUR, TasteProfile.SWEET],
      Visibility.PUBLIC,
      "Classic margarita recipe",
      new Date("2024-02-21"),
      1,
      [tequila, limeJuice, tripleSec]
    );

    expect(versionWithIngredients.ingredients).toEqual([tequila, limeJuice, tripleSec]);
    expect(versionWithIngredients.ingredients.length).toBe(3);

    expect(() => (versionWithIngredients.ingredients = [tequila])).toThrow("There must be at least 2 ingredients");
    expect(() => (versionWithIngredients.ingredients = [tequila, limeJuice, limeJuice])).toThrow(
      "Ingredients have duplicate names"
    );
  });

  test("steps management works correctly", () => {
    const step1 = new Step(testRecipeVersion, 1, "Rim glass with salt");
    const step2 = new Step(testRecipeVersion, 2, "Add ingredients to shaker with ice");
    const step3 = new Step(testRecipeVersion, 3, "Shake well and strain into glass");

    testRecipeVersion.steps = [step1, step2, step3];
    expect(testRecipeVersion.steps).toEqual([step1, step2, step3]);
    expect(testRecipeVersion.steps.length).toBe(3);
  });

  test("BAC calculation works correctly", () => {
    const tequila = new Ingredient(testRecipeVersion, "Tequila", 60, 40);
    const limeJuice = new Ingredient(testRecipeVersion, "Lime Juice", 25, 0);

    const versionWithIngredients = new RecipeVersion(
      creator,
      "Margarita",
      [TasteProfile.SOUR, TasteProfile.SWEET],
      Visibility.PUBLIC,
      "Classic margarita recipe",
      new Date("2024-02-21"),
      1,
      [tequila, limeJuice]
    );

    const bac = versionWithIngredients.calculateBAC(creator);
    expect(bac).toBeCloseTo(0.0398, 3);

    // Test with user who doesn't have a biological sex
    const userWithoutBiologicalSex = new UserBuilder()
      .withUsername("userwithoutsex")
      .withPassword("password123")
      .with2FAEnabled(false)
      .withZipCode("12345")
      .withWeightInKg(70)
      .withEmail("test@example.com")
      .withPhoneNumber("123-456-7890")
      .withProfilePicUrl("https://example.com/profile.jpg")
      .build();
    expect(() => versionWithIngredients.calculateBAC(userWithoutBiologicalSex)).toThrow("Biological sex is not set");

    // Test with user who doesn't have a weight
    const userWithoutWeight = new UserBuilder()
      .withUsername("userwithoutweight")
      .withPassword("password123")
      .with2FAEnabled(false)
      .withZipCode("12345")
      .withBiologicalSex(BiologicalSex.MALE)
      .withEmail("test@example.com")
      .withPhoneNumber("123-456-7890")
      .withProfilePicUrl("https://example.com/profile.jpg")
      .build();
    expect(() => versionWithIngredients.calculateBAC(userWithoutWeight)).toThrow("Weight in kilograms is not set");
  });

  test("version number is immutable", () => {
    const versionNumber = testRecipeVersion.versionNumber;
    expect(versionNumber).toBe(1);

    // Verify that versionNumber is readonly by checking that there's no setter
    expect(Object.getOwnPropertyDescriptor(RecipeVersion.prototype, "versionNumber")?.set).toBeUndefined();
  });

  test("multiple versions can exist with different version numbers", () => {
    const version2 = new RecipeVersion(
      creator,
      "Margarita V2",
      [TasteProfile.SOUR, TasteProfile.SWEET, TasteProfile.HOT],
      Visibility.PUBLIC,
      "Spicy version of classic margarita",
      new Date("2024-02-22"),
      2
    );

    expect(version2.versionNumber).toBe(2);
    expect(version2.title).toBe("Margarita V2");
    expect(version2.description).toBe("Spicy version of classic margarita");
    expect(version2.tasteProfiles).toEqual([TasteProfile.SOUR, TasteProfile.SWEET, TasteProfile.HOT]);
    expect(testRecipeVersion.versionNumber).toBe(1); // Original version unchanged
  });
});

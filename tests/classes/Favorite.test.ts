import { expect, test, describe } from "bun:test";
import { Favorite } from "../../src/lib/classes/Favorite";
import { Recipe } from "../../src/lib/classes/Recipe";
import { User } from "../../src/lib/classes/User";
import { BiologicalSex } from "../../src/lib/enums/BiologicalSex";
import { TasteProfile } from "../../src/lib/enums/TasteProfile";
import { Visibility } from "../../src/lib/enums/Visibility";

describe("Favorite", () => {
  const creator = new User(
    "creator",
    "password123",
    false,
    "12345",
    BiologicalSex.MALE,
    70,
    "creator@example.com",
    "123-456-7890",
    "https://example.com/creator.jpg"
  );

  const favoriter = new User(
    "favoriter",
    "password456",
    true,
    "54321",
    BiologicalSex.FEMALE,
    60,
    "favoriter@example.com",
    "098-765-4321",
    "https://example.com/favoriter.jpg"
  );

  const recipe = new Recipe(
    creator,
    "Margarita",
    [TasteProfile.SOUR, TasteProfile.SWEET],
    Visibility.PUBLIC,
    "Classic margarita recipe",
    new Date("2024-02-21")
  );

  const testFavorite = new Favorite(recipe, favoriter);

  test("constructor creates favorite with correct properties", () => {
    expect(testFavorite.recipe).toBe(recipe);
    expect(testFavorite.user).toBe(favoriter);
  });

  test("all properties are immutable", () => {
    const favoriteRecipe = testFavorite.recipe;
    const favoriteUser = testFavorite.user;

    expect(favoriteRecipe).toBe(recipe);
    expect(favoriteUser).toBe(favoriter);

    // Verify that all properties are readonly by checking that there are no setters
    expect(Object.getOwnPropertyDescriptor(Favorite.prototype, "recipe")?.set).toBeUndefined();
    expect(Object.getOwnPropertyDescriptor(Favorite.prototype, "user")?.set).toBeUndefined();
    expect(Object.getOwnPropertyDescriptor(Favorite.prototype, "timeCreated")?.set).toBeUndefined();
  });

  test("favorite represents correct relationship", () => {
    // Test that the favorite correctly represents the relationship between user and recipe
    expect(testFavorite.user.userId).toBe(favoriter.userId);
    expect(testFavorite.recipe.creator.userId).toBe(creator.userId);
    expect(testFavorite.recipe.title).toBe("Margarita");
  });
});

import { expect, test, describe } from "bun:test";
import { Like } from "../../src/lib/classes/Like";
import { Recipe } from "../../src/lib/classes/Recipe";
import { User } from "../../src/lib/classes/User";
import { BiologicalSex } from "../../src/lib/enums/BiologicalSex";
import { TasteProfile } from "../../src/lib/enums/TasteProfile";
import { Visibility } from "../../src/lib/enums/Visibility";

describe("Like", () => {
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

  const liker = new User(
    "liker",
    "password456",
    true,
    "54321",
    BiologicalSex.FEMALE,
    60,
    "liker@example.com",
    "098-765-4321",
    "https://example.com/liker.jpg"
  );

  const recipe = new Recipe(
    creator,
    "Margarita",
    [TasteProfile.SOUR, TasteProfile.SWEET],
    Visibility.PUBLIC,
    "Classic margarita recipe",
    new Date("2024-02-21")
  );

  const testLike = new Like(recipe, liker);

  test("constructor creates like with correct properties", () => {
    expect(testLike.recipe).toBe(recipe);
    expect(testLike.user).toBe(liker);

    expect(() => new Like(undefined as unknown as Recipe, liker)).toThrow("Recipe is not set");
    expect(() => new Like(recipe, undefined as unknown as User)).toThrow("User is not set");
  });

  test("all properties are immutable", () => {
    const likeRecipe = testLike.recipe;
    const likeUser = testLike.user;

    expect(likeRecipe).toBe(recipe);
    expect(likeUser).toBe(liker);

    // Verify that all properties are readonly by checking that there are no setters
    expect(Object.getOwnPropertyDescriptor(Like.prototype, "recipe")?.set).toBeUndefined();
    expect(Object.getOwnPropertyDescriptor(Like.prototype, "user")?.set).toBeUndefined();
    expect(Object.getOwnPropertyDescriptor(Like.prototype, "timeCreated")?.set).toBeUndefined();
  });

  test("like represents correct relationship", () => {
    // Test that the like correctly represents the relationship between user and recipe
    expect(testLike.user.userId).toBe(liker.userId);
    expect(testLike.recipe.creator.userId).toBe(creator.userId);
    expect(testLike.recipe.title).toBe("Margarita");
  });
});

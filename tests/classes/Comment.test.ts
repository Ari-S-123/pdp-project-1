import { expect, test, describe } from "bun:test";
import { Comment } from "../../src/lib/classes/Comment";
import { Recipe } from "../../src/lib/classes/Recipe";
import { User } from "../../src/lib/classes/User";
import { BiologicalSex } from "../../src/lib/enums/BiologicalSex";
import { TasteProfile } from "../../src/lib/enums/TasteProfile";
import { Visibility } from "../../src/lib/enums/Visibility";

describe("Comment", () => {
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

  const commenter = new User(
    "commenter",
    "password456",
    true,
    "54321",
    BiologicalSex.FEMALE,
    60,
    "commenter@example.com",
    "098-765-4321",
    "https://example.com/commenter.jpg"
  );

  const recipe = new Recipe(
    creator,
    "Margarita",
    [TasteProfile.SOUR, TasteProfile.SWEET],
    Visibility.PUBLIC,
    "Classic margarita recipe",
    new Date("2024-02-21")
  );

  const timeLastEdited = new Date("2024-02-21T10:00:00Z");
  const testComment = new Comment(recipe, commenter, "Great recipe! I love the balance of flavors.", timeLastEdited);

  test("constructor creates comment with correct properties", () => {
    expect(testComment.recipe).toBe(recipe);
    expect(testComment.user).toBe(commenter);
    expect(testComment.text).toBe("Great recipe! I love the balance of flavors.");
    expect(testComment.timeLastEdited).toEqual(timeLastEdited);
  });

  test("text setter updates property correctly", () => {
    testComment.text = "Amazing recipe! The proportions are perfect.";
    expect(testComment.text).toBe("Amazing recipe! The proportions are perfect.");
  });

  test("timeLastEdited setter updates property correctly", () => {
    const newEditTime = new Date("2024-02-21T11:00:00Z");
    testComment.timeLastEdited = newEditTime;
    expect(testComment.timeLastEdited).toEqual(newEditTime);
  });

  test("text setter throws error for invalid value", () => {
    expect(() => {
      testComment.text = "";
    }).toThrow("No text provided.");
  });

  test("timeLastEdited setter throws error for invalid value", () => {
    expect(() => {
      testComment.timeLastEdited = null as unknown as Date;
    }).toThrow("No timestamp provided.");
  });

  test("comment properties throw errors for invalid updates", () => {
    expect(() => {
      testComment.text = "";
    }).toThrow("No text provided.");

    expect(() => {
      testComment.timeLastEdited = null as unknown as Date;
    }).toThrow("No timestamp provided.");
  });

  test("recipe and user references are immutable", () => {
    const commentRecipe = testComment.recipe;
    const commentUser = testComment.user;

    expect(commentRecipe).toBe(recipe);
    expect(commentUser).toBe(commenter);

    // Verify that recipe and user are readonly by checking that there are no setters
    expect(Object.getOwnPropertyDescriptor(Comment.prototype, "recipe")?.set).toBeUndefined();
    expect(Object.getOwnPropertyDescriptor(Comment.prototype, "user")?.set).toBeUndefined();
  });

  test("timeCreated is immutable", () => {
    // Verify that timeCreated is readonly by checking that there is no setter
    expect(Object.getOwnPropertyDescriptor(Comment.prototype, "timeCreated")?.set).toBeUndefined();
  });
});

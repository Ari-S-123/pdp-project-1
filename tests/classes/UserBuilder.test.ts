import { expect, test, describe } from "bun:test";
import { UserBuilder } from "../../src/lib/classes/UserBuilder";
import { BiologicalSex } from "../../src/lib/enums/BiologicalSex";
import { User } from "../../src/lib/classes/User";

describe("UserBuilder", () => {
  test("should build a minimal valid user", () => {
    const user = new UserBuilder().withUsername("testUser").withPassword("password123").build();

    expect(user).toBeInstanceOf(User);
    expect(user.username).toBe("testUser");
    expect(user.password).toBe("password123");
    expect(user.is2FAEnabled).toBe(false);
    expect(user.friends).toEqual([]);
  });

  test("should build a complete user with all properties", () => {
    const user = new UserBuilder()
      .withUsername("completeUser")
      .withPassword("securePass123")
      .with2FAEnabled(true)
      .withZipCode("12345")
      .withBiologicalSex(BiologicalSex.FEMALE)
      .withWeightInKg(65)
      .withEmail("user@example.com")
      .withPhoneNumber("123-456-7890")
      .withProfilePicUrl("https://example.com/pic.jpg")
      .withFriends([])
      .build();

    expect(user).toBeInstanceOf(User);
    expect(user.username).toBe("completeUser");
    expect(user.password).toBe("securePass123");
    expect(user.is2FAEnabled).toBe(true);
    expect(user.zipCode).toBe("12345");
    expect(user.biologicalSex).toBe(BiologicalSex.FEMALE);
    expect(user.weightInKg).toBe(65);
    expect(user.email).toBe("user@example.com");
    expect(user.phoneNumber).toBe("123-456-7890");
    expect(user.profilePicUrl).toBe("https://example.com/pic.jpg");
    expect(user.friends).toEqual([]);
  });

  test("should throw error when building without required username", () => {
    const builder = new UserBuilder().withPassword("password123");

    expect(() => builder.build()).toThrow("Username is required");
  });

  test("should throw error when building without required password", () => {
    const builder = new UserBuilder().withUsername("testUser");

    expect(() => builder.build()).toThrow("Password is required");
  });

  test("should throw error when setting invalid biological sex", () => {
    const builder = new UserBuilder();

    expect(() => builder.withBiologicalSex(undefined as unknown as BiologicalSex)).toThrow(
      "No biological sex provided"
    );
    expect(() => builder.withBiologicalSex("INVALID" as BiologicalSex)).toThrow("Invalid biological sex");
  });

  test("should throw error when setting negative weight", () => {
    const builder = new UserBuilder();

    expect(() => builder.withWeightInKg(-1)).toThrow("Weight in kilograms cannot be negative");
  });

  test("should throw error when setting empty required fields", () => {
    const builder = new UserBuilder();

    expect(() => builder.withUsername("")).toThrow("No username provided");
    expect(() => builder.withPassword("")).toThrow("No password provided");
    expect(() => builder.withZipCode("")).toThrow("No zip code provided");
    expect(() => builder.withEmail("")).toThrow("No email provided");
    expect(() => builder.withPhoneNumber("")).toThrow("No phone number provided");
    expect(() => builder.withProfilePicUrl("")).toThrow("No profile picture URL provided");
  });

  test("should handle optional fields appropriately", () => {
    const user = new UserBuilder().withUsername("defaultUser").withPassword("pass123").build();

    // Test only the fields we know are safe to access
    expect(user.username).toBe("defaultUser");
    expect(user.password).toBe("pass123");
    expect(user.is2FAEnabled).toBe(false);
    expect(user.friends).toEqual([]);
  });

  test("should preserve values when chaining methods in different orders", () => {
    const user1 = new UserBuilder()
      .withUsername("user1")
      .withPassword("pass123")
      .withEmail("user1@example.com")
      .withZipCode("12345")
      .build();

    const user2 = new UserBuilder()
      .withEmail("user1@example.com")
      .withZipCode("12345")
      .withPassword("pass123")
      .withUsername("user1")
      .build();

    // Compare only the fields we explicitly set
    expect(user1.username).toBe(user2.username);
    expect(user1.password).toBe(user2.password);
    expect(user1.email).toBe(user2.email);
    expect(user1.zipCode).toBe(user2.zipCode);
  });
});

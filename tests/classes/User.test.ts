import { expect, test, describe } from "bun:test";
import { User } from "../../src/lib/classes/User";
import { BiologicalSex } from "../../src/lib/enums/BiologicalSex";

describe("User", () => {
  const testUser = new User(
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

  const friendUser = new User(
    "frienduser",
    "password456",
    true,
    "54321",
    BiologicalSex.FEMALE,
    60,
    "friend@example.com",
    "098-765-4321",
    "https://example.com/friend.jpg"
  );

  test("constructor creates user with correct properties", () => {
    expect(testUser.username).toBe("testuser");
    expect(testUser.password).toBe("password123");
    expect(testUser.is2FAEnabled).toBe(false);
    expect(testUser.zipCode).toBe("12345");
    expect(testUser.biologicalSex).toBe(BiologicalSex.MALE);
    expect(testUser.weightInKg).toBe(70);
    expect(testUser.email).toBe("test@example.com");
    expect(testUser.phoneNumber).toBe("123-456-7890");
    expect(testUser.profilePicUrl).toBe("https://example.com/profile.jpg");
    expect(testUser.friends).toEqual([]);

    expect(
      () =>
        new User(
          "",
          "password123",
          false,
          "12345",
          BiologicalSex.MALE,
          70,
          "test@example.com",
          "123-456-7890",
          "https://example.com/profile.jpg"
        )
    ).toThrow("Username is not set");
    expect(
      () =>
        new User(
          "testuser",
          "",
          false,
          "12345",
          BiologicalSex.MALE,
          70,
          "test@example.com",
          "123-456-7890",
          "https://example.com/profile.jpg"
        )
    ).toThrow("Password is not set");
  });

  test("userId is generated and unique", () => {
    const anotherUser = new User(
      "testuser2",
      "password789",
      false,
      "12345",
      BiologicalSex.MALE,
      75,
      "test2@example.com",
      "123-456-7891",
      "https://example.com/profile2.jpg"
    );
    expect(testUser.userId).toBeDefined();
    expect(anotherUser.userId).toBeDefined();
    expect(testUser.userId).not.toBe(anotherUser.userId);
  });

  test("setters update properties correctly", () => {
    testUser.username = "newusername";
    expect(testUser.username).toBe("newusername");

    expect(() => (testUser.username = "")).toThrow("Username is required");

    testUser.password = "newpassword";
    expect(testUser.password).toBe("newpassword");

    expect(() => (testUser.password = "")).toThrow("Password is required");

    testUser.is2FAEnabled = true;
    expect(testUser.is2FAEnabled).toBe(true);

    testUser.zipCode = "54321";
    expect(testUser.zipCode).toBe("54321");

    testUser.biologicalSex = BiologicalSex.FEMALE;
    expect(testUser.biologicalSex).toBe(BiologicalSex.FEMALE);

    testUser.weightInKg = 75;
    expect(testUser.weightInKg).toBe(75);

    testUser.email = "newemail@example.com";
    expect(testUser.email).toBe("newemail@example.com");

    testUser.phoneNumber = "987-654-3210";
    expect(testUser.phoneNumber).toBe("987-654-3210");

    testUser.profilePicUrl = "https://example.com/newprofile.jpg";
    expect(testUser.profilePicUrl).toBe("https://example.com/newprofile.jpg");
  });

  test("friend management works correctly", () => {
    const userWithoutFriends = new User(
      "testuser3",
      "password789",
      false,
      "12345",
      BiologicalSex.MALE,
      75,
      "test3@example.com",
      "123-456-7892",
      "https://example.com/profile3.jpg"
    );

    expect(userWithoutFriends.friends).toEqual([]);
    userWithoutFriends.addFriend(friendUser);
    expect(userWithoutFriends.friends).toEqual([friendUser]);
    expect(userWithoutFriends.friends.length).toBe(1);

    userWithoutFriends.removeFriend(friendUser);
    expect(userWithoutFriends.friends).toEqual([]);
    expect(userWithoutFriends.friends.length).toBe(0);
  });

  test("getters throw errors for undefined optional properties", () => {
    const incompleteUser = new User("incomplete", "password", false, "", undefined, 0, "", "", "");

    expect(() => incompleteUser.zipCode).toThrow("Zip code is not set");
    expect(() => incompleteUser.biologicalSex).toThrow("Biological sex is not set");
    expect(() => incompleteUser.weightInKg).toThrow("Weight in kilograms is not set");
    expect(() => incompleteUser.email).toThrow("Email is not set");
    expect(() => incompleteUser.phoneNumber).toThrow("Phone number is not set");
    expect(() => incompleteUser.profilePicUrl).toThrow("Profile picture URL is not set");
  });
});

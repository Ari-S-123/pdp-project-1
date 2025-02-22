import { expect, test, describe } from "bun:test";
import { FriendRequest } from "../../src/lib/classes/FriendRequest";
import { User } from "../../src/lib/classes/User";
import { BiologicalSex } from "../../src/lib/enums/BiologicalSex";
import { FriendRequestStatus } from "../../src/lib/enums/FriendRequestStatus";

describe("FriendRequest", () => {
  const sender = new User(
    "sender",
    "password123",
    false,
    "12345",
    BiologicalSex.MALE,
    70,
    "sender@example.com",
    "123-456-7890",
    "https://example.com/sender.jpg"
  );

  const receiver = new User(
    "receiver",
    "password456",
    true,
    "54321",
    BiologicalSex.FEMALE,
    60,
    "receiver@example.com",
    "098-765-4321",
    "https://example.com/receiver.jpg"
  );

  const testFriendRequest = new FriendRequest(sender, receiver, FriendRequestStatus.PENDING);

  test("constructor creates friend request with correct properties", () => {
    expect(testFriendRequest.senderUser).toBe(sender);
    expect(testFriendRequest.receiverUser).toBe(receiver);
    expect(testFriendRequest.status).toBe(FriendRequestStatus.PENDING);

    expect(() => new FriendRequest(undefined as unknown as User, receiver, FriendRequestStatus.PENDING)).toThrow(
      "Sender user is not set"
    );
    expect(() => new FriendRequest(sender, undefined as unknown as User, FriendRequestStatus.PENDING)).toThrow(
      "Receiver user is not set"
    );
    expect(() => new FriendRequest(sender, receiver, undefined as unknown as FriendRequestStatus)).toThrow(
      "Status is not set"
    );
  });

  test("status setter updates property correctly", () => {
    testFriendRequest.status = FriendRequestStatus.ACCEPTED;
    expect(testFriendRequest.status).toBe(FriendRequestStatus.ACCEPTED);

    testFriendRequest.status = FriendRequestStatus.DECLINED;
    expect(testFriendRequest.status).toBe(FriendRequestStatus.DECLINED);

    testFriendRequest.status = FriendRequestStatus.PENDING;
    expect(testFriendRequest.status).toBe(FriendRequestStatus.PENDING);
  });

  test("status setter throws error for invalid value", () => {
    expect(() => {
      testFriendRequest.status = undefined as unknown as FriendRequestStatus;
    }).toThrow("No status provided.");
  });

  test("friend request properties throw errors for invalid updates", () => {
    expect(() => {
      testFriendRequest.status = undefined as unknown as FriendRequestStatus;
    }).toThrow("No status provided.");
  });

  test("sender, receiver, and timeCreated are immutable", () => {
    const requestSender = testFriendRequest.senderUser;
    const requestReceiver = testFriendRequest.receiverUser;

    expect(requestSender).toBe(sender);
    expect(requestReceiver).toBe(receiver);

    // Verify that properties are readonly by checking that there are no setters
    expect(Object.getOwnPropertyDescriptor(FriendRequest.prototype, "senderUser")?.set).toBeUndefined();
    expect(Object.getOwnPropertyDescriptor(FriendRequest.prototype, "receiverUser")?.set).toBeUndefined();
    expect(Object.getOwnPropertyDescriptor(FriendRequest.prototype, "timeCreated")?.set).toBeUndefined();
  });

  test("friend request represents correct relationship", () => {
    // Test that the friend request correctly represents the relationship between users
    expect(testFriendRequest.senderUser.userId).toBe(sender.userId);
    expect(testFriendRequest.receiverUser.userId).toBe(receiver.userId);
    expect(testFriendRequest.senderUser.username).toBe("sender");
    expect(testFriendRequest.receiverUser.username).toBe("receiver");
  });
});

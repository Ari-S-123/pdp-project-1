import { expect, test, describe } from "bun:test";
import { Message } from "../../src/lib/classes/Message";
import { User } from "../../src/lib/classes/User";
import { BiologicalSex } from "../../src/lib/enums/BiologicalSex";

describe("Message", () => {
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

  const testMessage = new Message("Hello, would you like to share recipes?", [], sender, receiver);

  test("constructor creates message with correct properties", () => {
    expect(testMessage.text).toBe("Hello, would you like to share recipes?");
    expect(testMessage.attachmentUrls).toEqual([]);
    expect(testMessage.sender).toBe(sender);
    expect(testMessage.receiver).toBe(receiver);
    expect(testMessage.isRead).toBe(false);
    expect(testMessage.timeLastEdited).toEqual(testMessage.timeCreated);

    expect(() => new Message("", [], sender, receiver)).toThrow("Text is not set");
    expect(
      () => new Message("Hello, would you like to share recipes?", [], undefined as unknown as User, receiver)
    ).toThrow("Sender is not set");
    expect(
      () => new Message("Hello, would you like to share recipes?", [], sender, undefined as unknown as User)
    ).toThrow("Receiver is not set");
  });

  test("text setter updates property correctly", () => {
    testMessage.text = "Hello, I have a great margarita recipe to share!";
    expect(testMessage.text).toBe("Hello, I have a great margarita recipe to share!");
  });

  test("attachmentUrls setter updates property correctly", () => {
    const attachments = ["https://example.com/recipe1.jpg", "https://example.com/recipe2.jpg"];
    testMessage.attachmentUrls = attachments;
    expect(testMessage.attachmentUrls).toEqual(attachments);
  });

  test("timeLastEdited setter updates property correctly", () => {
    const newEditTime = new Date("2024-02-21T11:00:00Z");
    testMessage.timeLastEdited = newEditTime;
    expect(testMessage.timeLastEdited).toEqual(newEditTime);
  });

  test("text setter throws error for invalid value", () => {
    expect(() => {
      testMessage.text = "";
    }).toThrow("No text provided.");
  });

  test("timeLastEdited setter throws error for invalid value", () => {
    expect(() => {
      testMessage.timeLastEdited = undefined as unknown as Date;
    }).toThrow("No timestamp provided.");
  });

  test("message properties throw errors for invalid updates", () => {
    expect(() => {
      testMessage.text = "";
    }).toThrow("No text provided.");

    expect(() => {
      testMessage.timeLastEdited = undefined as unknown as Date;
    }).toThrow("No timestamp provided.");
  });

  test("sender and receiver references are immutable", () => {
    const messageSender = testMessage.sender;
    const messageReceiver = testMessage.receiver;

    expect(messageSender).toBe(sender);
    expect(messageReceiver).toBe(receiver);

    // Verify that sender and receiver are readonly by checking that there are no setters
    expect(Object.getOwnPropertyDescriptor(Message.prototype, "sender")?.set).toBeUndefined();
    expect(Object.getOwnPropertyDescriptor(Message.prototype, "receiver")?.set).toBeUndefined();
  });

  test("timeCreated is immutable", () => {
    const messageTimeCreated = testMessage.timeCreated;
    expect(messageTimeCreated).toEqual(testMessage.timeCreated);

    // Verify that timeCreated is readonly by checking that there are no setters
    expect(Object.getOwnPropertyDescriptor(Message.prototype, "timeCreated")?.set).toBeUndefined();
  });
});

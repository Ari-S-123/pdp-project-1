import type IMessage from "../interfaces/IMessage";
import type IUser from "../interfaces/IUser";
/**
 * @class Message
 * @implements {IMessage}
 * @description Implementation of a message between users.
 */
export class Message implements IMessage {
  private _text: string;
  private readonly _timeCreated: Date;
  private _attachmentUrls: string[];
  private _sender: IUser;
  private _receiver: IUser;
  private _isRead: boolean;
  private _timeLastEdited: Date;

  /**
   * @constructor
   * @param {string} text - The content of the message.
   * @param {string[]} attachmentUrls - The URLs of any attachments to the message.
   * @param {IUser} sender - The user who sent the message.
   * @param {IUser} receiver - The user who received the message.
   */
  public constructor(text: string, attachmentUrls: string[], sender: IUser, receiver: IUser) {
    if (!text) {
      throw new Error("Text is not set");
    }
    if (!attachmentUrls) {
      throw new Error("Attachment URLs are not set");
    }
    if (!sender) {
      throw new Error("Sender is not set");
    }
    if (!receiver) {
      throw new Error("Receiver is not set");
    }
    this._text = text;
    this._timeCreated = new Date();
    this._attachmentUrls = attachmentUrls;
    this._sender = sender;
    this._receiver = receiver;
    this._isRead = false;
    this._timeLastEdited = this._timeCreated;
  }

  /**
   * @returns {string} The content of the message.
   */
  public get text(): string {
    return this._text;
  }
  /**
   * @param {string} text The new content of the message.
   */
  public set text(text: string) {
    if (!text) {
      throw new Error("No text provided.");
    }
    this._text = text;
  }

  /**
   * @returns {Date} The creation timestamp of the message.
   */
  public get timeCreated(): Date {
    return this._timeCreated;
  }

  /**
   * @returns {string[]} The URLs of any attachments to the message.
   */
  public get attachmentUrls(): string[] {
    return this._attachmentUrls;
  }
  /**
   * @param {string[]} attachmentUrls The new URLs of attachments to the message.
   */
  public set attachmentUrls(attachmentUrls: string[]) {
    this._attachmentUrls = attachmentUrls;
  }

  /**
   * @returns {IUser} The user who sent the message.
   */
  public get sender(): IUser {
    return this._sender;
  }

  /**
   * @returns {IUser} The user who received the message.
   */
  public get receiver(): IUser {
    return this._receiver;
  }

  /**
   * @returns {boolean} Whether the message has been read by the receiver.
   */
  public get isRead(): boolean {
    return this._isRead;
  }

  /**
   * @param {boolean} isRead The new value for whether the message has been read by the receiver.
   */
  public set isRead(isRead: boolean) {
    this._isRead = isRead;
  }

  /**
   * @returns {Date} The timestamp of the last edit to the message.
   */
  public get timeLastEdited(): Date {
    return this._timeLastEdited;
  }
  /**
   * @param {Date} timeLastEdited The new timestamp of the last edit to the message.
   */
  public set timeLastEdited(timeLastEdited: Date) {
    if (!timeLastEdited) {
      throw new Error("No timestamp provided.");
    }
    this._timeLastEdited = timeLastEdited;
  }
}

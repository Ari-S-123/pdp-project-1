import IMessage from "../interfaces/IMessage";
import IUser from "../interfaces/IUser";
/**
 * @class Message
 * @implements {IMessage}
 * @description Implementation of a message between users.
 */
export class Message implements IMessage {
  private _text: string;
  private _timeCreated: Date;
  private _attachmentUrls: string[];
  private _sender: IUser;
  private _receiver: IUser;
  private _isRead: boolean;
  private _timeLastEdited: Date;

  /**
   * @constructor
   * @param {string} text - The content of the message.
   * @param {Date} timeCreated - The creation timestamp of the message.
   * @param {string[]} attachmentUrls - The URLs of any attachments to the message.
   * @param {IUser} sender - The user who sent the message.
   * @param {IUser} receiver - The user who received the message.
   * @param {boolean} isRead - Whether the message has been read by the receiver.
   * @param {Date} timeLastEdited - The timestamp of the last edit to the message.
   */
  constructor(
    text: string,
    timeCreated: Date,
    attachmentUrls: string[],
    sender: IUser,
    receiver: IUser,
    isRead: boolean,
    timeLastEdited: Date
  ) {
    this._text = text;
    this._timeCreated = timeCreated;
    this._attachmentUrls = attachmentUrls;
    this._sender = sender;
    this._receiver = receiver;
    this._isRead = isRead;
    this._timeLastEdited = timeLastEdited;
  }

  /**
   * @returns {string} The content of the message.
   */
  get text(): string {
    return this._text;
  }
  /**
   * @param {string} text The new content of the message.
   */
  set text(text: string) {
    this._text = text;
  }

  /**
   * @returns {Date} The creation timestamp of the message.
   */
  get timeCreated(): Date {
    return this._timeCreated;
  }

  /**
   * @returns {string[]} The URLs of any attachments to the message.
   */
  get attachmentUrls(): string[] {
    return this._attachmentUrls;
  }
  /**
   * @param {string[]} attachmentUrls The new URLs of attachments to the message.
   */
  set attachmentUrls(attachmentUrls: string[]) {
    this._attachmentUrls = attachmentUrls;
  }

  /**
   * @returns {IUser} The user who sent the message.
   */
  get sender(): IUser {
    return this._sender;
  }

  /**
   * @returns {IUser} The user who received the message.
   */
  get receiver(): IUser {
    return this._receiver;
  }

  /**
   * @returns {boolean} Whether the message has been read by the receiver.
   */
  get isRead(): boolean {
    return this._isRead;
  }

  /**
   * @returns {Date} The timestamp of the last edit to the message.
   */
  get timeLastEdited(): Date {
    return this._timeLastEdited;
  }
  /**
   * @param {Date} timeLastEdited The new timestamp of the last edit to the message.
   */
  set timeLastEdited(timeLastEdited: Date) {
    this._timeLastEdited = timeLastEdited;
  }
}

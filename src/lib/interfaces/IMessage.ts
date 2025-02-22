import type IUser from "./IUser";

/**
 * @interface IMessage
 * @description Represents a message.
 */
export default interface IMessage {
  /**
   * @returns {string} The text of the message.
   */
  get text(): string;

  /**
   * @returns {Date} The date and time the message was created.
   */
  get timeCreated(): Date;

  /**
   * @returns {string[]} The URLs where the attachments of the message are stored.
   */
  get attachmentUrls(): string[];

  /**
   * @returns {IUser} The user that sent the message.
   */
  get sender(): IUser;

  /**
   * @returns {IUser} The user that received the message.
   */
  get receiver(): IUser;

  /**
   * @returns {boolean} Whether the message is read by the receiver.
   */
  get isRead(): boolean;

  /**
   * @param {boolean} isRead The new value for whether the message is read by the receiver.
   */
  set isRead(isRead: boolean);

  /**
   * @returns {Date} The date and time the message was last edited.
   */
  get timeLastEdited(): Date;

  /**
   * @description Sets the text of the message.
   * @param {string} text The text of the message.
   */
  set text(text: string);

  /**
   * @description Sets the URLs where the attachments of the message are stored.
   * @param {string[]} attachmentUrls The URLs where the attachments of the message are stored.
   */
  set attachmentUrls(attachmentUrls: string[]);

  /**
   * @description Sets the date and time the message was last edited.
   * @param {Date} timeLastEdited The date and time the message was last edited.
   */
  set timeLastEdited(timeLastEdited: Date);
}

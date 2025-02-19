import { FriendRequestStatus } from "../enums/FriendRequestStatus";

/**
 * @interface IFriendRequest
 * @description Represents a friend request.
 */
export default interface IFriendRequest {
  /**
   * @returns {string} The ID of the user that sent the friend request.
   */
  get senderUserId(): string;

  /**
   * @returns {string} The ID of the user that received the friend request.
   */
  get receiverUserId(): string;

  /**
   * @returns {Date} The date and time the friend request was created.
   */
  get timeCreated(): Date;

  /**
   * @returns {FriendRequestStatus} The status of the friend request.
   */
  get status(): FriendRequestStatus;

  /**
   * @description Sets the status of the friend request.
   * @param {FriendRequestStatus} status The status of the friend request.
   */
  set status(status: FriendRequestStatus);
}

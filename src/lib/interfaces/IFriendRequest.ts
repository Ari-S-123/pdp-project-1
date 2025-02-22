import type { FriendRequestStatus } from "../enums/FriendRequestStatus";
import type IUser from "./IUser";

/**
 * @interface IFriendRequest
 * @description Represents a friend request.
 */
export default interface IFriendRequest {
  /**
   * @returns {IUser} The user that sent the friend request.
   */
  get senderUser(): IUser;

  /**
   * @returns {IUser} The user that received the friend request.
   */
  get receiverUser(): IUser;

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

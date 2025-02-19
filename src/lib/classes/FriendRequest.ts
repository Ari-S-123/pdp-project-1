import IFriendRequest from "../interfaces/IFriendRequest";
import { FriendRequestStatus } from "../enums/FriendRequestStatus";

/**
 * @class FriendRequest
 * @implements {IFriendRequest}
 * @description Implementation of a friend request between users.
 */
export class FriendRequest implements IFriendRequest {
  private _senderUserId: string;
  private _receiverUserId: string;
  private _timeCreated: Date;
  private _status: FriendRequestStatus;

  /**
   * @constructor
   * @param {string} senderUserId - The ID of the user who sent the friend request.
   * @param {string} receiverUserId - The ID of the user who received the friend request.
   * @param {Date} timeCreated - The creation timestamp of the friend request.
   * @param {FriendRequestStatus} status - The current status of the friend request.
   */
  constructor(senderUserId: string, receiverUserId: string, timeCreated: Date, status: FriendRequestStatus) {
    this._senderUserId = senderUserId;
    this._receiverUserId = receiverUserId;
    this._timeCreated = timeCreated;
    this._status = status;
  }

  /**
   * @returns {string} The ID of the user who sent the friend request.
   */
  get senderUserId(): string {
    return this._senderUserId;
  }

  /**
   * @returns {string} The ID of the user who received the friend request.
   */
  get receiverUserId(): string {
    return this._receiverUserId;
  }

  /**
   * @returns {Date} The creation timestamp of the friend request.
   */
  get timeCreated(): Date {
    return this._timeCreated;
  }

  /**
   * @returns {FriendRequestStatus} The current status of the friend request.
   */
  get status(): FriendRequestStatus {
    return this._status;
  }
  /**
   * @param {FriendRequestStatus} status The new status of the friend request.
   */
  set status(status: FriendRequestStatus) {
    this._status = status;
  }
}

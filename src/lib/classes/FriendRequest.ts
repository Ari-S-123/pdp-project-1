import IFriendRequest from "../interfaces/IFriendRequest";
import { FriendRequestStatus } from "../enums/FriendRequestStatus";
import IUser from "../interfaces/IUser";

/**
 * @class FriendRequest
 * @implements {IFriendRequest}
 * @description Implementation of a friend request between users.
 */
export class FriendRequest implements IFriendRequest {
  private _senderUser: IUser;
  private _receiverUser: IUser;
  private _timeCreated: Date;
  private _status: FriendRequestStatus;

  /**
   * @constructor
   * @param {IUser} senderUser - The user who sent the friend request.
   * @param {IUser} receiverUser - The user who received the friend request.
   * @param {Date} timeCreated - The creation timestamp of the friend request.
   * @param {FriendRequestStatus} status - The current status of the friend request.
   */
  constructor(senderUser: IUser, receiverUser: IUser, timeCreated: Date, status: FriendRequestStatus) {
    this._senderUser = senderUser;
    this._receiverUser = receiverUser;
    this._timeCreated = timeCreated;
    this._status = status;
  }

  /**
   * @returns {IUser} The user who sent the friend request.
   */
  get senderUser(): IUser {
    return this._senderUser;
  }

  /**
   * @returns {IUser} The user who received the friend request.
   */
  get receiverUser(): IUser {
    return this._receiverUser;
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
    if (!status) {
      throw new Error("No status provided.");
    }
    this._status = status;
  }
}

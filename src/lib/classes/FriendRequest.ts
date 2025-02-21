import IFriendRequest from "../interfaces/IFriendRequest";
import { FriendRequestStatus } from "../enums/FriendRequestStatus";
import IUser from "../interfaces/IUser";

/**
 * @class FriendRequest
 * @implements {IFriendRequest}
 * @description Implementation of a friend request between users.
 */
export class FriendRequest implements IFriendRequest {
  private readonly _senderUser: IUser;
  private readonly _receiverUser: IUser;
  private readonly _timeCreated: Date;
  private _status: FriendRequestStatus;

  /**
   * @constructor
   * @param {IUser} senderUser - The user who sent the friend request.
   * @param {IUser} receiverUser - The user who received the friend request.
   * @param {FriendRequestStatus} status - The current status of the friend request.
   */
  public constructor(senderUser: IUser, receiverUser: IUser, status: FriendRequestStatus) {
    this._senderUser = senderUser;
    this._receiverUser = receiverUser;
    this._timeCreated = new Date();
    this._status = status;
  }

  /**
   * @returns {IUser} The user who sent the friend request.
   */
  public get senderUser(): IUser {
    return this._senderUser;
  }

  /**
   * @returns {IUser} The user who received the friend request.
   */
  public get receiverUser(): IUser {
    return this._receiverUser;
  }

  /**
   * @returns {Date} The creation timestamp of the friend request.
   */
  public get timeCreated(): Date {
    return this._timeCreated;
  }

  /**
   * @returns {FriendRequestStatus} The current status of the friend request.
   */
  public get status(): FriendRequestStatus {
    return this._status;
  }
  /**
   * @param {FriendRequestStatus} status The new status of the friend request.
   */
  public set status(status: FriendRequestStatus) {
    if (!status) {
      throw new Error("No status provided.");
    }
    this._status = status;
  }
}

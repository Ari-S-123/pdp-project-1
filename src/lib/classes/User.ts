import IUser from "../interfaces/IUser";

/**
 * @class User
 * @implements {IUser}
 * @description Implementation of a user with all their properties and methods.
 */
export class User implements IUser {
  private _userId: string;
  private _username: string;
  private _password: string;
  private _is2FAEnabled: boolean;
  private _timeCreated: Date;
  private _zipCode: string;
  private _biologicalSex: string;
  private _weightInKg: number;
  private _email: string;
  private _phoneNumber: string;
  private _profilePicUrl: string;
  private _friends: IUser[];

  /**
   * @constructor
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @param {boolean} is2FAEnabled - Whether two-factor authentication is enabled.
   * @param {Date} timeCreated - The creation timestamp of the user account.
   * @param {string} zipCode - The zip code of the user's location.
   * @param {string} biologicalSex - The biological sex of the user.
   * @param {number} weightInKg - The weight of the user in kilograms.
   * @param {string} email - The email address of the user.
   * @param {string} phoneNumber - The phone number of the user.
   * @param {string} profilePicUrl - The URL of the user's profile picture.
   * @param {IUser[]} [friends=[]] - The friends of the user.
   */
  constructor(
    username: string,
    password: string,
    is2FAEnabled: boolean,
    timeCreated: Date,
    zipCode: string,
    biologicalSex: string,
    weightInKg: number,
    email: string,
    phoneNumber: string,
    profilePicUrl: string,
    friends: IUser[] = []
  ) {
    this._userId = crypto.randomUUID();
    this._username = username;
    this._password = password;
    this._is2FAEnabled = is2FAEnabled;
    this._timeCreated = timeCreated;
    this._zipCode = zipCode;
    this._biologicalSex = biologicalSex;
    this._weightInKg = weightInKg;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._profilePicUrl = profilePicUrl;
    this._friends = friends;
  }

  /**
   * @returns {string} The unique identifier of the user.
   */
  get userId(): string {
    return this._userId;
  }

  /**
   * @returns {string} The username of the user.
   */
  get username(): string {
    return this._username;
  }
  /**
   * @param {string} username The new username of the user.
   */
  set username(username: string) {
    this._username = username;
  }

  /**
   * @returns {string} The password of the user.
   */
  get password(): string {
    return this._password;
  }
  /**
   * @param {string} password The new password of the user.
   */
  set password(password: string) {
    this._password = password;
  }

  /**
   * @returns {boolean} Whether two-factor authentication is enabled.
   */
  get is2FAEnabled(): boolean {
    return this._is2FAEnabled;
  }
  /**
   * @param {boolean} is2FAEnabled Whether to enable or disable two-factor authentication.
   */
  set is2FAEnabled(is2FAEnabled: boolean) {
    this._is2FAEnabled = is2FAEnabled;
  }

  /**
   * @returns {Date} The creation timestamp of the user account.
   */
  get timeCreated(): Date {
    return this._timeCreated;
  }

  /**
   * @returns {string} The zip code of the user's location.
   */
  get zipCode(): string {
    return this._zipCode;
  }
  /**
   * @param {string} zipCode The new zip code of the user's location.
   */
  set zipCode(zipCode: string) {
    this._zipCode = zipCode;
  }

  /**
   * @returns {string} The biological sex of the user.
   */
  get biologicalSex(): string {
    return this._biologicalSex;
  }
  /**
   * @param {string} biologicalSex The biological sex of the user.
   */
  set biologicalSex(biologicalSex: string) {
    this._biologicalSex = biologicalSex;
  }

  /**
   * @returns {number} The weight of the user in kilograms.
   */
  get weightInKg(): number {
    return this._weightInKg;
  }
  /**
   * @param {number} weightInKg The new weight of the user in kilograms.
   */
  set weightInKg(weightInKg: number) {
    this._weightInKg = weightInKg;
  }

  /**
   * @returns {string} The email address of the user.
   */
  get email(): string {
    return this._email;
  }
  /**
   * @param {string} email The new email address of the user.
   */
  set email(email: string) {
    this._email = email;
  }

  /**
   * @returns {string} The phone number of the user.
   */
  get phoneNumber(): string {
    return this._phoneNumber;
  }
  /**
   * @param {string} phoneNumber The new phone number of the user.
   */
  set phoneNumber(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
  }

  /**
   * @returns {string} The URL of the user's profile picture.
   */
  get profilePicUrl(): string {
    return this._profilePicUrl;
  }
  /**
   * @param {string} profilePicUrl The new URL of the user's profile picture.
   */
  set profilePicUrl(profilePicUrl: string) {
    this._profilePicUrl = profilePicUrl;
  }

  /**
   * @returns {IUser[]} The friends of the user.
   */
  get friends(): IUser[] {
    return this._friends;
  }

  /**
   * @description Adds a friend to the user.
   * @param {IUser} user The user to add as a friend.
   */
  public addFriend(user: IUser): void {
    this._friends.push(user);
  }

  /**
   * @description Removes a friend from the user.
   * @param {IUser} user The user to remove as a friend.
   */
  public removeFriend(user: IUser): void {
    this._friends = this._friends.filter((friend) => friend.userId !== user.userId);
  }
}

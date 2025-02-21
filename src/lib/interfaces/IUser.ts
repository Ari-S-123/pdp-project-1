/**
 * @interface IUser
 * @description Represents a user.
 */
export default interface IUser {
  /**
   * @returns {string} The ID of the user.
   */
  get userId(): string;

  /**
   * @returns {string} The username of the user.
   */
  get username(): string;

  /**
   * @returns {string} The password of the user.
   */
  get password(): string;

  /**
   * @returns {boolean} Whether the user has 2FA enabled.
   */
  get is2FAEnabled(): boolean;

  /**
   * @returns {Date} The date and time the user was created.
   */
  get timeCreated(): Date;

  /**
   * @returns {string} The zip code of the user.
   */
  get zipCode(): string;

  /**
   * @returns {string} The biological sex of the user.
   */
  get biologicalSex(): string;

  /**
   * @returns {number} The weight of the user in kilograms.
   */
  get weightInKg(): number;

  /**
   * @returns {string} The email of the user.
   */
  get email(): string;

  /**
   * @returns {string} The phone number of the user.
   */
  get phoneNumber(): string;

  /**
   * @returns {string} The profile picture URL of the user.
   */
  get profilePicUrl(): string;

  /**
   * @returns {IUser[]} The user's friends.
   */
  get friends(): IUser[];

  /**
   * @description Adds a friend to the user.
   * @param {IUser} user The user to add as a friend.
   */
  addFriend(user: IUser): void;

  /**
   * @description Removes a friend from the user.
   * @param {IUser} user The user to remove as a friend.
   */
  removeFriend(user: IUser): void;

  /**
   * @description Sets the username of the user.
   * @param {string} username The username of the user.
   */
  set username(username: string);

  /**
   * @description Sets the password of the user.
   * @param {string} password The password of the user.
   */
  set password(password: string);

  /**
   * @description Sets whether the user has 2FA enabled.
   * @param {boolean} is2FAEnabled Whether the user has 2FA enabled.
   */
  set is2FAEnabled(is2FAEnabled: boolean);

  /**
   * @description Sets the zip code of the user.
   * @param {string} zipCode The zip code of the user.
   */
  set zipCode(zipCode: string);

  /**
   * @description Sets the biological sex of the user.
   * @param {string} biologicalSex The biological sex of the user.
   */
  set biologicalSex(biologicalSex: string);

  /**
   * @description Sets the weight of the user in kilograms.
   * @param {number} weightInKg The weight of the user in kilograms.
   */
  set weightInKg(weightInKg: number);

  /**
   * @description Sets the email of the user.
   * @param {string} email The email of the user.
   */
  set email(email: string);

  /**
   * @description Sets the phone number of the user.
   * @param {string} phoneNumber The phone number of the user.
   */
  set phoneNumber(phoneNumber: string);

  /**
   * @description Sets the profile picture URL of the user.
   * @param {string} profilePicUrl The profile picture URL of the user.
   */
  set profilePicUrl(profilePicUrl: string);
}

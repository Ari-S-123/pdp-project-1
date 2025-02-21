import IUser from "../interfaces/IUser";
import { User } from "./User";
import { BiologicalSex } from "../enums/BiologicalSex";
/**
 * @class UserBuilder
 * @description Builder class for creating User instances with a fluent interface.
 */
export class UserBuilder {
  private _username: string;
  private _password: string;
  private _is2FAEnabled: boolean;
  private _timeCreated: Date;
  private _zipCode?: string;
  private _biologicalSex?: BiologicalSex;
  private _weightInKg?: number;
  private _email?: string;
  private _phoneNumber?: string;
  private _profilePicUrl?: string;
  private _friends: IUser[];

  constructor() {
    // Initialize with default values
    this._username = "";
    this._password = "";
    this._is2FAEnabled = false;
    this._timeCreated = new Date();
    this._friends = [];
  }

  /**
   * @param {string} username The username of the user.
   * @returns {UserBuilder} The builder instance for method chaining.
   */
  public withUsername(username: string): UserBuilder {
    if (!username) {
      throw new Error("No username provided.");
    }
    this._username = username;
    return this;
  }

  /**
   * @param {string} password The password of the user.
   * @returns {UserBuilder} The builder instance for method chaining.
   */
  public withPassword(password: string): UserBuilder {
    if (!password) {
      throw new Error("No password provided.");
    }
    this._password = password;
    return this;
  }

  /**
   * @param {boolean} is2FAEnabled Whether two-factor authentication is enabled.
   * @returns {UserBuilder} The builder instance for method chaining.
   */
  public with2FAEnabled(is2FAEnabled: boolean): UserBuilder {
    this._is2FAEnabled = is2FAEnabled;
    return this;
  }

  /**
   * @param {Date} timeCreated The creation timestamp of the user account.
   * @returns {UserBuilder} The builder instance for method chaining.
   */
  public withTimeCreated(timeCreated: Date): UserBuilder {
    if (!timeCreated) {
      throw new Error("No timestamp provided.");
    }
    this._timeCreated = timeCreated;
    return this;
  }

  /**
   * @param {string} zipCode The zip code of the user's location.
   * @returns {UserBuilder} The builder instance for method chaining.
   */
  public withZipCode(zipCode: string): UserBuilder {
    if (!zipCode) {
      throw new Error("No zip code provided.");
    }
    this._zipCode = zipCode;
    return this;
  }

  /**
   * @param {string} biologicalSex The biological sex of the user.
   * @returns {UserBuilder} The builder instance for method chaining.
   */
  public withBiologicalSex(biologicalSex: BiologicalSex): UserBuilder {
    if (!biologicalSex) {
      throw new Error("No biological sex provided.");
    }
    const validBiologicalSexes = [BiologicalSex.MALE, BiologicalSex.FEMALE];
    if (!validBiologicalSexes.includes(biologicalSex)) {
      throw new Error("Invalid biological sex.");
    }
    this._biologicalSex = biologicalSex;
    return this;
  }

  /**
   * @param {number} weightInKg The weight of the user in kilograms.
   * @returns {UserBuilder} The builder instance for method chaining.
   */
  public withWeightInKg(weightInKg: number): UserBuilder {
    if (weightInKg < 0) {
      throw new Error("Weight in kilograms cannot be negative.");
    }
    this._weightInKg = weightInKg;
    return this;
  }

  /**
   * @param {string} email The email address of the user.
   * @returns {UserBuilder} The builder instance for method chaining.
   */
  public withEmail(email: string): UserBuilder {
    if (!email) {
      throw new Error("No email provided.");
    }
    this._email = email;
    return this;
  }

  /**
   * @param {string} phoneNumber The phone number of the user.
   * @returns {UserBuilder} The builder instance for method chaining.
   */
  public withPhoneNumber(phoneNumber: string): UserBuilder {
    if (!phoneNumber) {
      throw new Error("No phone number provided.");
    }
    this._phoneNumber = phoneNumber;
    return this;
  }

  /**
   * @param {string} profilePicUrl The URL of the user's profile picture.
   * @returns {UserBuilder} The builder instance for method chaining.
   */
  public withProfilePicUrl(profilePicUrl: string): UserBuilder {
    if (!profilePicUrl) {
      throw new Error("No profile picture URL provided.");
    }
    this._profilePicUrl = profilePicUrl;
    return this;
  }

  /**
   * @param {IUser[]} friends The friends of the user.
   * @returns {UserBuilder} The builder instance for method chaining.
   */
  public withFriends(friends: IUser[]): UserBuilder {
    if (!friends) {
      throw new Error("No friends provided.");
    }
    this._friends = friends;
    return this;
  }

  /**
   * @description Validates that all required fields are set before building the User.
   * @throws {Error} If any required field is missing.
   */
  private validate(): void {
    if (!this._username) throw new Error("Username is required");
    if (!this._password) throw new Error("Password is required");
  }

  /**
   * @description Builds and returns a new User instance with the configured properties.
   * @returns {User} A new User instance.
   * @throws {Error} If any required field is missing.
   */
  public build(): User {
    this.validate();
    return new User(
      this._username,
      this._password,
      this._is2FAEnabled,
      this._timeCreated,
      this._zipCode || "",
      this._biologicalSex || undefined,
      this._weightInKg || 0,
      this._email || "",
      this._phoneNumber || "",
      this._profilePicUrl || "",
      this._friends
    );
  }
}

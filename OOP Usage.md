# Object-Oriented Programming Usage

This document demonstrates how Object-Oriented Programming principles and patterns are applied in this project.

## OOP Pillars

### 1. Abstraction

Abstraction is implemented through interfaces that define contracts for different entities in the system. Each interface hides implementation details and exposes only the necessary methods and properties.

Example from `IRecipe` interface:

```typescript
export default interface IRecipe {
  get creator(): IUser;
  get title(): string;
  get tasteProfiles(): TasteProfile[];
  get visibility(): boolean;
  get timeCreated(): Date;
  get description(): string;
  get timeLastUpdated(): Date;
  get ingredients(): IIngredient[];
  get steps(): IStep[];
  calculateBAC(user: IUser): number;
}
```

Bad Example (Breaking Abstraction):

```typescript
// Bad: Exposing internal implementation details
interface IRecipe {
  _creator: IUser; // Directly exposing private field
  _ingredients: IIngredient[]; // Exposing internal storage
  updateIngredientsArray(index: number, ingredient: IIngredient): void; // Exposing implementation details
}
```

### 2. Encapsulation

Encapsulation is achieved through private fields and public getters/setters that control access to object properties.

Example from `Ingredient` class:

```typescript
export class Ingredient implements IIngredient {
  private _recipe: IRecipe;
  private _name: string;
  private _volumeInMl: number;
  private _abv: number;

  public set abv(abv: number) {
    if (abv < 0 || abv > 100) {
      throw new Error("Invalid alcohol by volume percentage.");
    }
    this._abv = abv;
  }

  public set volumeInMl(volumeInMl: number) {
    if (volumeInMl < 0) {
      throw new Error("Volume in milliliters cannot be negative.");
    }
    this._volumeInMl = volumeInMl;
  }
}
```

Bad Example (Breaking Encapsulation):

```typescript
// Bad: No data validation or access control
class Ingredient {
  public recipe: IRecipe;
  public volumeInMl: number;
  public abv: number; // Direct access to properties without validation
}
```

### 3. Inheritance

Inheritance is used to extend base functionality while maintaining the "is-a" relationship.

Example from `RecipeVersion` class:

```typescript
export class RecipeVersion extends Recipe implements IRecipeVersion {
  private _versionNumber: number;

  public constructor(
    creator: IUser,
    title: string,
    tasteProfiles: TasteProfile[],
    visibility: Visibility,
    timeCreated: Date,
    description: string,
    timeLastUpdated: Date,
    versionNumber: number,
    ingredients: IIngredient[] = [],
    steps: IStep[] = []
  ) {
    super(creator, title, tasteProfiles, visibility, timeCreated, description, timeLastUpdated, ingredients, steps);
    this._versionNumber = versionNumber;
  }

  public get versionNumber(): number {
    return this._versionNumber;
  }
}
```

Bad Example (Breaking Inheritance):

```typescript
// Bad: Breaking Liskov Substitution Principle
class RecipeVersion extends Recipe {
  constructor() {
    super();
    throw new Error("Cannot create recipe version"); // Breaking parent's contract
  }

  calculateBAC() {
    return null; // Breaking parent's behavior
  }
}
```

### 4. Polymorphism

Polymorphism is demonstrated through interface implementation across different classes.

Example from multiple classes implementing social interactions:

```typescript
export class Like implements ILike {
  private _recipe: IRecipe;
  private _user: IUser;
  private _timeCreated: Date;

  public get recipe(): IRecipe {
    return this._recipe;
  }

  public get timeCreated(): Date {
    return this._timeCreated;
  }
}

export class Comment implements IComment {
  private _recipe: IRecipe;
  private _user: IUser;
  private _text: string;
  private _timeCreated: Date;
  private _timeLastEdited: Date;

  public get recipe(): IRecipe {
    return this._recipe;
  }

  public get timeCreated(): Date {
    return this._timeCreated;
  }
}
```

Bad Example (Breaking Polymorphism):

```typescript
// Bad: Type checking instead of polymorphic behavior
class RecipeInteraction {
  handleInteraction(interaction: any) {
    if (interaction instanceof Like) {
      // Handle like
    } else if (interaction instanceof Comment) {
      // Handle comment
    }
    // Adding new types requires modifying this code
  }
}
```

## SOLID Principles

### 1. Single Responsibility Principle (SRP)

Each class has a single, well-defined responsibility.

Example from `Like` class:

```typescript
export class Like implements ILike {
  private _recipe: IRecipe;
  private _user: IUser;
  private _timeCreated: Date;

  public constructor(recipe: IRecipe, user: IUser, timeCreated: Date) {
    this._recipe = recipe;
    this._user = user;
    this._timeCreated = timeCreated;
  }

  public get recipe(): IRecipe {
    return this._recipe;
  }

  public get user(): IUser {
    return this._user;
  }

  public get timeCreated(): Date {
    return this._timeCreated;
  }
}
```

### 2. Open/Closed Principle (OCP)

The system is open for extension but closed for modification through interfaces and inheritance.

Example with Recipe versioning:

```typescript
export default interface IRecipe {
  // Base recipe functionality
  get creator(): IUser;
  get title(): string;
  // ... other properties
}

export default interface IRecipeVersion extends IRecipe {
  get versionNumber(): number;
}
```

### 3. Liskov Substitution Principle (LSP)

Subtypes can be substituted for their base types without altering program correctness.

Example with Recipe and RecipeVersion:

```typescript
export class Recipe implements IRecipe {
  public calculateBAC(user: IUser): number {
    const ethanolDensity = 0.78945;
    const doseInGrams = this.ingredients.reduce((acc, ingredient) => {
      // Convert ABV from percentage (e.g., 40) to a fraction (0.40)
      const alcoholMl = ingredient.volumeInMl * (ingredient.abv / 100);
      return acc + alcoholMl * ethanolDensity;
    }, 0);
    const bodyWeightInGrams = user.weightInKg * 1000;
    const widmarkConstant = user.biologicalSex === BiologicalSex.MALE ? 0.68 : 0.55;
    return (doseInGrams / (bodyWeightInGrams * widmarkConstant)) * 100;
  }
}

export class RecipeVersion extends Recipe {
  // Inherits calculateBAC without changing its behavior
  // Adds version tracking functionality
  public get versionNumber(): number {
    return this._versionNumber;
  }
}
```

### 4. Interface Segregation Principle (ISP)

The codebase uses specific interfaces rather than large, monolithic ones.

Example:

```typescript
export default interface ILike {
  get recipe(): IRecipe;
  get user(): IUser;
  get timeCreated(): Date;
}

export default interface IComment {
  get recipe(): IRecipe;
  get user(): IUser;
  get text(): string;
  get timeCreated(): Date;
  get timeLastEdited(): Date;
  set text(text: string);
  set timeLastEdited(timeLastEdited: Date);
}
```

### 5. Dependency Inversion Principle (DIP)

High-level modules depend on abstractions, not concrete implementations.

Example from Recipe class:

```typescript
export class Recipe implements IRecipe {
  public constructor(
    creator: IUser, // Depends on IUser interface
    title: string,
    tasteProfiles: TasteProfile[],
    visibility: Visibility,
    timeCreated: Date,
    description: string,
    timeLastUpdated: Date,
    ingredients: IIngredient[] = [], // Depends on IIngredient interface
    steps: IStep[] = [] // Depends on IStep interface
  ) {
    // Implementation
  }
}
```

## Design Patterns

The codebase implements several design patterns that demonstrate good Object-Oriented Programming practices:

### 1. Builder Pattern

The Builder pattern is used in `UserBuilder` to create complex `User` objects with many optional parameters in a fluent, readable way.

Example from `UserBuilder`:

```typescript
export class UserBuilder {
  private _username: string;
  private _password: string;
  private _is2FAEnabled: boolean;
  // ... other private fields ...

  public withUsername(username: string): UserBuilder {
    if (!username) {
      throw new Error("No username provided.");
    }
    this._username = username;
    return this;
  }

  public withPassword(password: string): UserBuilder {
    if (!password) {
      throw new Error("No password provided.");
    }
    this._password = password;
    return this;
  }
  // ... other builder methods ...
}

// Usage:
const user = new UserBuilder()
  .withUsername("john_doe")
  .withPassword("secure123")
  .with2FAEnabled(true)
  .withEmail("john@example.com")
  .build();
```

This is good OOP because it:

- Separates object construction from its representation
- Provides input validation at each step
- Makes complex object creation readable and maintainable
- Allows for optional parameters without constructor overloading

Bad Example (Breaking Builder Pattern):

```typescript
// Bad: Direct object construction with many parameters
class User {
  constructor(
    username?: string,
    password?: string,
    is2FAEnabled?: boolean,
    zipCode?: string
    // ... 10 more optional parameters ...
  ) {
    // No validation, confusing parameter order
    this.username = username || "";
    this.password = password || "";
    // ... and so on
  }
}
```

### 2. Immutable Object Pattern

The Immutable Object pattern is implemented in social interaction classes like `Like` and `Favorite`, where objects are created once and never modified.

Example from `Like`:

```typescript
export class Like implements ILike {
  private readonly _recipe: IRecipe;
  private readonly _user: IUser;
  private readonly _timeCreated: Date;

  public constructor(recipe: IRecipe, user: IUser) {
    this._recipe = recipe;
    this._user = user;
    this._timeCreated = new Date();
  }

  public get recipe(): IRecipe {
    return this._recipe;
  }

  public get user(): IUser {
    return this._user;
  }

  public get timeCreated(): Date {
    return this._timeCreated;
  }
}
```

This is good OOP because it:

- Ensures thread safety
- Prevents state inconsistency
- Makes objects predictable and reliable
- Simplifies debugging and testing

Bad Example (Breaking Immutability):

```typescript
// Bad: Mutable like object
class MutableLike {
  public recipe: IRecipe;
  public user: IUser;
  public timeCreated: Date;

  setNewUser(user: IUser) {
    this.user = user; // Allowing mutation breaks the concept of a "like"
    this.timeCreated = new Date(); // Inconsistent state
  }
}
```

### 3. Template Method Pattern

The Template Method pattern is used in the `Recipe` and `RecipeVersion` classes, where `RecipeVersion` extends `Recipe` and inherits its core functionality while adding version-specific behavior.

Example:

```typescript
export class Recipe implements IRecipe {
  public calculateBAC(user: IUser): number {
    const ethanolDensity = 0.78945;
    const doseInGrams = this.ingredients.reduce((acc, ingredient) => {
      const alcoholMl = ingredient.volumeInMl * (ingredient.abv / 100);
      return acc + alcoholMl * ethanolDensity;
    }, 0);
    const bodyWeightInGrams = user.weightInKg * 1000;
    const widmarkConstant = user.biologicalSex === BiologicalSex.MALE ? 0.68 : 0.55;
    return (doseInGrams / (bodyWeightInGrams * widmarkConstant)) * 100;
  }
}

export class RecipeVersion extends Recipe {
  private readonly _versionNumber: number;

  public get versionNumber(): number {
    return this._versionNumber;
  }
}
```

This is good OOP because it:

- Allows code reuse through inheritance
- Maintains the Liskov Substitution Principle
- Provides a clear extension point for variations
- Keeps common functionality in one place

Bad Example (Breaking Template Method):

```typescript
// Bad: Overriding template method inconsistently
class BrokenRecipeVersion extends Recipe {
  calculateBAC(user: IUser): number {
    // Breaking the contract by returning invalid values
    return Math.random(); // Completely different implementation
  }

  get ingredients(): IIngredient[] {
    return []; // Breaking parent's behavior
  }
}
```

### 4. Observer Pattern

The Observer pattern is implemented through the relationship between `Recipe` and its associated entities (`Like`, `Comment`, `Favorite`), where these entities observe and track changes to recipes.

Example of the pattern in the relationships:

```typescript
// Recipe acts as the subject
export class Recipe implements IRecipe {
  private _ingredients: IIngredient[] = [];
  private _steps: IStep[] = [];

  // State changes are exposed through getters/setters
  public set ingredients(ingredients: IIngredient[]) {
    this._ingredients = ingredients;
  }
}

// Like acts as an observer
export class Like implements ILike {
  private readonly _recipe: IRecipe;
  private readonly _timeCreated: Date;

  constructor(recipe: IRecipe, user: IUser) {
    this._recipe = recipe;
    this._timeCreated = new Date();
  }
}
```

This is good OOP because it:

- Establishes loose coupling between recipes and their observers
- Allows for easy addition of new observer types
- Maintains consistency across related objects
- Supports the Open/Closed Principle

Bad Example (Breaking Observer Pattern):

```typescript
// Bad: Tight coupling and direct manipulation
class TightlyCoupledRecipe {
  private likes: Like[] = [];
  private comments: Comment[] = [];

  addLike(user: IUser) {
    // Directly managing observers
    this.likes.push(new Like(this, user));
    this.updateDatabase();
    this.notifyUI();
    // Tightly coupled to specific implementations
  }
}
```

These patterns demonstrate how the codebase uses OOP principles to create maintainable, extensible, and robust code. Each pattern serves a specific purpose and helps manage complexity in different aspects of the system.

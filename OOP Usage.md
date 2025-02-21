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

The codebase primarily uses interface-based design and composition rather than complex design patterns. The main patterns evident in the codebase are:

1. Interface-based Programming: All classes implement interfaces that define their contracts
2. Composition over Inheritance: Most relationships use composition (e.g., Recipe has Ingredients and Steps)
3. Immutable Value Objects: Classes like Like and Comment are effectively immutable after creation

While more complex patterns like Observer, Builder, or Factory could be beneficial additions to the codebase, they are not currently implemented. The focus has been on maintaining clean, simple, and maintainable code through good OOP practices and SOLID principles.

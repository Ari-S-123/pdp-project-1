# Object-Oriented Programming Usage in the Codebase

This document outlines how Object-Oriented Programming (OOP) principles, SOLID principles, and design patterns are applied in our codebase.

## OOP Pillars

### 1. Abstraction

Abstraction is implemented through interfaces that define contracts for our classes. A good example is the `IRecipe` interface:

```typescript
// Example from our codebase
export default interface IRecipe {
  get title(): string;
  get ingredients(): IIngredient[];
  get steps(): IStep[];
  // ... other abstract properties and methods
}
```

**Why it's good**: The interface abstracts away implementation details and provides a clear contract for what a recipe should be able to do.

**Counter-example of bad abstraction**:

```typescript
// Bad abstraction - too much implementation detail exposed
interface IBadRecipe {
  _internalStorageFormat: string;
  _databaseConnection: DatabaseConnection;
  _rawDataBuffer: Buffer;
  convertToJSON(): string;
}
```

### 2. Encapsulation

Encapsulation is demonstrated in the `Ingredient` class:

```typescript
// Example from our codebase
export class Ingredient implements IIngredient {
  private _name: string;
  private _volumeInMl: number;
  private _abv: number;

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
  // ... other getters and setters
}
```

**Why it's good**: Private fields with public getters/setters ensure data integrity and hide implementation details.

**Counter-example of broken encapsulation**:

```typescript
// Bad encapsulation - direct public access to fields
class BadIngredient {
  public name: string;
  public volumeInMl: number;
  public abv: number;
  // Any code can modify these directly, potentially breaking invariants
}
```

### 3. Inheritance

Inheritance is shown in the `RecipeVersion` class:

```typescript
// Example from our codebase
export class RecipeVersion extends Recipe implements IRecipeVersion {
  private _versionNumber: number;

  constructor(
    creatorUserId: string,
    title: string,
    // ... other parameters
    versionNumber: number
  ) {
    super(creatorUserId, title /* ... other params */);
    this._versionNumber = versionNumber;
  }
}
```

**Why it's good**: `RecipeVersion` reuses all the functionality from `Recipe` while adding version-specific features.

**Counter-example of bad inheritance**:

```typescript
// Bad inheritance - violates Liskov Substitution Principle
class BadRecipeVersion extends Recipe {
  constructor() {
    super();
  }

  get ingredients() {
    throw new Error("Ingredients not supported in this version");
    // Breaks the contract established by the parent class
  }
}
```

### 4. Polymorphism

Polymorphism is demonstrated through interface implementation across different classes:

```typescript
// Example from our codebase
export class Recipe implements IRecipe {
  /* ... */
}
export class RecipeVersion implements IRecipe {
  /* ... */
}
export class Step implements IStep {
  /* ... */
}
```

**Why it's good**: Different classes can be used interchangeably where their interfaces are expected.

**Counter-example of broken polymorphism**:

```typescript
// Bad polymorphism - type checking defeats the purpose
function processRecipe(recipe: IRecipe) {
  if (recipe instanceof Recipe) {
    // do something
  } else if (recipe instanceof RecipeVersion) {
    // do something else
  }
  // This defeats the purpose of polymorphism
}
```

## SOLID Principles

### 1. Single Responsibility Principle (SRP)

The `Step` class demonstrates SRP:

```typescript
// Example from our codebase
export class Step implements IStep {
  private _recipeId: string;
  private _stepNumber: number;
  private _description: string;

  // Methods only related to step management
  get description(): string {
    return this._description;
  }
}
```

**Why it's good**: The class has one reason to change - managing recipe step information.

**Counter-example of violating SRP**:

```typescript
// Bad SRP - class has multiple responsibilities
class BadStep {
  description: string;

  saveToDatabase() {
    /* ... */
  }
  validateInput() {
    /* ... */
  }
  renderToHTML() {
    /* ... */
  }
  // Too many responsibilities in one class
}
```

### 2. Open/Closed Principle (OCP)

The recipe system demonstrates OCP through its interface-based design:

```typescript
// Example from our codebase
export default interface IRecipe {
  // Base interface
}

export class Recipe implements IRecipe {
  // Base implementation
}

export class RecipeVersion extends Recipe {
  // Extended functionality without modifying base
}
```

**Why it's good**: New recipe types can be added without modifying existing code.

**Counter-example of violating OCP**:

```typescript
// Bad OCP - requires modifying existing code to add new types
class BadRecipeProcessor {
  processRecipe(recipe: Recipe) {
    if (recipe.type === "basic") {
      // process basic recipe
    } else if (recipe.type === "version") {
      // process version
    }
    // Need to modify this code for each new recipe type
  }
}
```

### 3. Liskov Substitution Principle (LSP)

The `RecipeVersion` class demonstrates LSP by properly extending `Recipe`:

```typescript
// Example from our codebase
export class RecipeVersion extends Recipe implements IRecipeVersion {
  // Maintains all contracts from Recipe
  // Adds version-specific functionality without breaking base behavior
}
```

**Why it's good**: `RecipeVersion` can be used anywhere a `Recipe` is expected.

**Counter-example of violating LSP**:

```typescript
// Bad LSP - derived class breaks base class contract
class BadRecipeVersion extends Recipe {
  get ingredients() {
    if (this.isLocked) {
      throw new Error("Cannot access ingredients of locked recipe");
      // Violates base class contract
    }
    return super.ingredients;
  }
}
```

### 4. Interface Segregation Principle (ISP)

Our interfaces are focused and specific:

```typescript
// Example from our codebase
export default interface IIngredient {
  get name(): string;
  get volumeInMl(): number;
  get abv(): number;
}

export default interface IStep {
  get stepNumber(): number;
  get description(): string;
}
```

**Why it's good**: Interfaces are small and focused, clients only depend on methods they use.

**Counter-example of violating ISP**:

```typescript
// Bad ISP - interface too large, forces unnecessary implementations
interface IBadRecipeComponent {
  getName(): string;
  getVolume(): number;
  getStepNumber(): number;
  getDescription(): string;
  getDuration(): number;
  getTemperature(): number;
  // Classes must implement methods they don't need
}
```

### 5. Dependency Inversion Principle (DIP)

Our classes depend on abstractions (interfaces) rather than concrete implementations:

```typescript
// Example from our codebase
export class Recipe {
  private _ingredients: IIngredient[];
  private _steps: IStep[];

  constructor(ingredients: IIngredient[], steps: IStep[]) {
    this._ingredients = ingredients;
    this._steps = steps;
  }
}
```

**Why it's good**: The Recipe class depends on interfaces, not concrete implementations.

**Counter-example of violating DIP**:

```typescript
// Bad DIP - depends on concrete classes
class BadRecipe {
  private ingredients: Ingredient[]; // Concrete class
  private steps: Step[]; // Concrete class

  constructor() {
    this.ingredients = [new Ingredient()]; // Direct instantiation
    this.steps = [new Step()]; // Direct instantiation
  }
}
```

## Design Patterns

### 1. Builder Pattern

The Recipe creation process could benefit from a Builder pattern (proposed enhancement):

```typescript
class RecipeBuilder {
  private recipe: Recipe;

  constructor() {
    this.recipe = new Recipe();
  }

  withTitle(title: string): RecipeBuilder {
    this.recipe.title = title;
    return this;
  }

  withIngredient(ingredient: IIngredient): RecipeBuilder {
    this.recipe.ingredients.push(ingredient);
    return this;
  }

  withStep(step: IStep): RecipeBuilder {
    this.recipe.steps.push(step);
    return this;
  }

  build(): Recipe {
    return this.recipe;
  }
}
```

**Why it's good**: Simplifies creation of complex objects, makes the process more readable.

### 2. Factory Pattern

A Recipe Factory pattern could be implemented (proposed enhancement):

```typescript
class RecipeFactory {
  static createBasicRecipe(title: string): Recipe {
    return new Recipe(generateUserId(), title, [], Visibility.PRIVATE, new Date(), "", new Date());
  }

  static createRecipeVersion(baseRecipe: Recipe, versionNumber: number): RecipeVersion {
    return new RecipeVersion(
      baseRecipe.creatorUserId,
      baseRecipe.title,
      baseRecipe.tasteProfiles,
      baseRecipe.visibility,
      new Date(),
      baseRecipe.description,
      new Date(),
      versionNumber
    );
  }
}
```

**Why it's good**: Encapsulates object creation logic, provides a consistent way to create different types of recipes.

### 3. Observer Pattern

A Recipe update notification system could be implemented (proposed enhancement):

```typescript
interface IRecipeObserver {
  update(recipe: IRecipe): void;
}

class Recipe {
  private observers: IRecipeObserver[] = [];

  addObserver(observer: IRecipeObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: IRecipeObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  protected notifyObservers(): void {
    this.observers.forEach((observer) => observer.update(this));
  }

  set title(title: string) {
    this._title = title;
    this.notifyObservers();
  }
}
```

**Why it's good**: Allows loose coupling between recipe updates and interested parties (UI, cache, etc.).

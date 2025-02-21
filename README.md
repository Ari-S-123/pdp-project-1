# MixSmart

MixSmart is a new cocktail recipe platform that combines advanced AI-powered generation tools with social sharing features, giving users a creative yet controlled environment to craft, discover, and personalize their favorite drinks. Catering to cocktail enthusiasts (age 21 or above) who value customization and community, MixSmart places each user at the center of their experience. By weaving AI innovation and social discovery into a curated experience, MixSmart empowers cocktail lovers to create, refine, and share recipes in a platform that balances creativity with control—making it the ideal digital companion for everyone from casual sippers to dedicated mixologists.

Note: The original repo was created on 2025-02-12. I deleted it and recreated it on 2025-02-18 which is why the first commit was made on 2025-02-18. But the project proposal was uploaded to the original repo on 2025-02-12.

## TODO

- [x] Properly implement BAC calculation
- [x] Document OOP usage
- [x] Update implementation of classes to not use id references
- [x] Double check input validation implementation
- [x] Implement unit tests with bun:test
- [x] Implement Github Actions (Optional)

## Features chosen to not be implemented

These would be hard for other people to test locally without having to expose my API key or forcing graders to get their own API key.

- Age verification would be handled in the frontend with an API call to a third party service. Age is not modeled in this project as all users are assumed to be above 21.
- AI recipe generation with Gemini API
- Restful endpoints with hono and persistence layer with drizzle and postgres

## Setup

1. Clone Repo

2. Make sure you are using the latest Node LTS version at the time of the last commit [v22.x].

3. Run `npm i -g bun` to install Bun.

4. Run `bun i` to install the dependencies.

## Scripts

To install dependencies:

```sh
bun i
```

To run tests:

```sh
bun test
```

To lint:

```sh
bun lint
```

To format:

```sh
bun format
```

## Project Proposal

Refer to the [Project Proposal](./Project%20Proposal.md) document for more information on the project.

## UML Diagram

[UML Diagram Link](https://lucid.app/lucidchart/004dfd0b-3b14-41e0-9959-1cfc2c77f47a/edit?invitationId=inv_5cd3057b-8dce-4686-86a1-56a751556329)

## UI Mockups

[UI Mockups](https://www.figma.com/design/DVjv0IZhI7psUEEVeLe7ZK/MixSmart-UI-Mockups?node-id=0-1&t=rE2CcvRN7MfN6QE7-1)

## OOP Usage

Refer to the [OOP Usage](./OOP%20Usage.md) document for more information on the OOP principles used in this project.

## Video

Refer to this [video](https://youtu.be/HinoY3xhG4w) for a demo of the project.

## AI Usage

Refer to the [Project Proposal](./Project%20Proposal.md) document for more information on the AI usage in this project.

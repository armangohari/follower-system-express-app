# Follower-System-Express-App

This is a simple API for a follower system implemented with Express.js, TypeScript, Prisma, and SQLite. Database (`./prisma/follower-system-express-app.db`) will be, generated, migrated, and seeded after running the [How to Use](#how-to-use) instructions with 4 initial users and 8 follower relationship between them, for being able to test out the API endpoints more realistically.

## Features
- **Follow Users**: Allowing users to follow other users.
- **Unfollow Users**: Allowing users to unfollow other users.
- **Get Followers**: Retrieval of the list of followers for a specific user.
- **Get Following**: Retrieval of the list of users that a specific user is following.
- **Mutual Followers**: Retrieval of the list of mutual followers between two users.
- **Conflict Handling**: Handled conflicts such as attempting to follow a user that is already followed or unfollow a user that is not being followed, providing appropriate HTTP status codes and messages.
- **Initial Data Seeding**: Pre-populated database with initial data for testing the API endpoints.


## Tech Stack
- Express.js
- TypeScript
- Prisma
- SQLite

## Requirements
- [NodeJS v20+](https://nodejs.org/en/download/package-manager)  (npm included)
- npm v10+
- [SQLite v3+](https://www.sqlite.org/download.html)


## How to Use

1. Install the requirement(s) above.

2. Clone the repository using `git clone https://github.com/armangohari/follower-system-express-app.git` command.

3. `cd follower-system-express-app` for getting into the project root directory.

4. Run `npm install` to install required packages.

5. Run `npm run database` to generate prisma db, migrate it, and seed it with initial data. **(Important!)**

6. Run `npm run dev` for running the app in development mode.

7. Open the browser of your choice and go to http://localhost:3000/api-docs for testing out the API endpoints.

8. **Enjoy playing around with the swagger :)**
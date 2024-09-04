# User Management App

This project is a web application built with React, Next.js, and Prisma. It includes a `DataGrid` for managing user data, with features to add, update, delete, and sort user records. The backend is powered by Next.js API routes and Prisma for database operations.

## Table of Contents

1. [Installation](#installation)
2. [API Endpoints](#api-endpoints)
3. [Prisma Setup](#prisma-setup)
4. [Seeding the Database](#seeding-the-database)
5. [Scripts](#scripts)

---

## Installation

Follow these steps to set up the project:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

```bash
npm install
```

or if you use Yarn:

```bash
yarn install
```

### 3. Install Prisma CLI

```bash
npm install @prisma/cli --save-dev
```

or if you use Yarn:

```bash
yarn add @prisma/cli --dev
```

---

## API Endpoints

The project provides several API endpoints to manage user data. These are accessible through `pages/api/users.ts`:

### 1. `GET /api/users`

- **Description**: Retrieve a list of all users.
- **Response**: An array of user objects.

### 2. `PUT /api/users`

- **Description**: Update multiple users.
- **Request Body**: An array of user objects to update.
- **Response**: An array of updated user objects.
- **Error Response**: `{ "error": "Failed to update user" }`

### 3. `DELETE /api/users`

- **Description**: Delete a user.
- **Request Body**: `{ "id": number }` - The ID of the user to delete.
- **Response**: `{ "message": "User deleted successfully" }`
- **Error Response**: `{ "error": "Failed to delete user" }`

---

## Prisma Setup

### 1. Initialize Prisma

To initialize Prisma and set up your database, run:

```bash
npx prisma init
```

This will create a `prisma` directory with a `schema.prisma` file where you can define your data model.

### 2. Update `schema.prisma`

Define your user model in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:../database/sqlite.db"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int    @id @default(autoincrement())
  firstName String
  lastName  String
  position  String
  phone     String
  email     String @unique
}
```

### 3. Migrate Your Database

Apply the Prisma migrations to create the database tables:

```bash
npx prisma migrate dev --name init
```

### 4. Generate Prisma Client

Generate the Prisma client to interact with the database:

```bash
npx prisma generate
```

---

## Seeding the Database

To run the seed script:

```bash
npx ts-node prisma/seed.js
```

---

## Scripts

### Development

Start the development server:

```bash
npm run dev
```

or if you use Yarn:

```bash
yarn dev
```

### Build

Build the project for production:

```bash
npm run build
```

or if you use Yarn:

```bash
yarn build
```

### Start

Start the production server:

```bash
npm start
```

or if you use Yarn:

```bash
yarn start
```

### Lint

Run ESLint to check for code quality issues:

```bash
npm run lint
```

or if you use Yarn:

```bash
yarn lint
```

---

## Contributing

Feel free to submit issues or pull requests. Please ensure that your code follows the project's style guidelines and includes appropriate tests.

---
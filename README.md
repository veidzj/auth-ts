# Auth TS

## Project Summary

Auth TS is a user authentication and authorization system developed using TypeScript and Node. It provides a robust set of features for managing user authentication and authorization. The project aims to offer a secure and efficient way for applications to handle user authentication and authorization processes.


## Project Features

### Completed Features

- [x] User sign up
- [x] User sign in

### Features To Do

- [ ] Deactivate a user
- [ ] Activate a user
- [ ] Change user's email
- [ ] Change password
- [ ] Change profile picture
- [ ] Check if a user has a specific permission (user or admin)


## Standards Used

The project adheres to several industry-standard practices and patterns to ensure high-quality, maintainable, and scalable code. These include:

- Clean Architecture
- SOLID principles
- Don't Repeat Yourself (DRY)
- You Aren't Gonna Need It (YAGNI)
- Keep It Simple, Silly (KISS)
- Test-Driven Development (TDD)
- Domain-Driven Design (DDD)
- Composition Over Inheritance
- Small Commits
- Factory Pattern
- Adapter Pattern
- Composite Pattern
- Proxy Pattern
- Dependency Injection
- Composition Root
- Builder Pattern
- Conventional Commits
- Git Flow
- Continuous Integration (CI)
- Continuous Deployment (CD)


## Tools Used

The project utilizes a variety of tools categorized based on their functionality:

### Development and Production

- TypeScript
- Node.js
- MongoDB
- Express.js
- JWT for authentication and authorization
- Bcrypt for hashing passwords

### Testing

- Jest
- Supertest
- Mockdate
- Faker

### Code Quality and Maintenance

- ESLint with Standard configuration
- Husky for Git hooks
- Lint-staged for staging files
- Nodemon for hot reloading
- Validator for data validation
- npm-check-updates for managing dependencies
- Module Alias for cleaner import paths

### Documentation

- Swagger for API documentation


## Requirements for Running Locally

To run the project locally, you must have the following tools installed:

- Node.js (v20 or later)
- MongoDB (v7 or later)

## How to Run Locally

Follow these commands to set up and run the application locally:

```bash
npm install # To install dependencies
npm run build # To build the application
npm start # To start the application
# or
npm run debug # To debug the application
```


## Requirements for Running with Docker

To run the project using Docker, you must have Docker installed on your machine.

## How to Run with Docker

Use the following commands to set up and run the application using Docker:

```bash
npm run up # To start the application using Docker Compose
npm run down # To stop the Docker Compose
```

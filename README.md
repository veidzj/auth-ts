# Auth TS

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=veidzj_auth-ts&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=veidzj_auth-ts)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=veidzj_auth-ts&metric=bugs)](https://sonarcloud.io/summary/new_code?id=veidzj_auth-ts)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=veidzj_auth-ts&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=veidzj_auth-ts)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=veidzj_auth-ts&metric=coverage)](https://sonarcloud.io/summary/new_code?id=veidzj_auth-ts)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=veidzj_auth-ts&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=veidzj_auth-ts)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=veidzj_auth-ts&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=veidzj_auth-ts)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=veidzj_auth-ts&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=veidzj_auth-ts)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=veidzj_auth-ts&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=veidzj_auth-ts)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=veidzj_auth-ts&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=veidzj_auth-ts)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=veidzj_auth-ts&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=veidzj_auth-ts)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=veidzj_auth-ts&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=veidzj_auth-ts)

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Code Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Project Summary

Auth TS is a user authentication and authorization system developed using TypeScript and Node. It provides a robust set of features for managing user authentication and authorization. The project aims to offer a secure and efficient way for applications to handle user authentication and authorization processes.


## Project Features

### Completed Features

- [x] Account sign up
- [x] Account sign in

### Features To Do

- [ ] Deactivate an account
- [ ] Activate an account
- [ ] Change account's email
- [ ] Change password
- [ ] Change profile image
- [ ] Check if an account has a specific permission (user or admin)


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


## How to Run Locally

To run the project locally, ensure you have the following tools installed:

- Node.js (v20 or later)
- MongoDB (v7 or later)

Then follow these commands to set up and run the application locally:

```bash
npm install # To install dependencies
npm run build # To build the application
npm start # To start the application
# or
npm run debug # To debug the application
```


## How to Run with Docker

To run the project using Docker, ensure you have Docker installed on your machine.

Then follow these commands to set up and run the application using Docker:

```bash
npm run up # To start the application using Docker Compose
npm run down # To stop the Docker Compose
```

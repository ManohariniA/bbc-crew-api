# BBC Crew Members API

This project provides an API for managing crew members and their associated data. It includes endpoints for filtering crew members by show and searching for crew members or shows based on a query parameter.

## Features

- **Get All Crew Members**: Retrieve a list of all crew members.
- **Get All shows**: Retrieve a list of all shows and their data.
- **Get All departments**: Retrieve a list of all departments and their data.
- **Filter Crew Members by Show**: Filter crew members based on the show name.
- **Search Crew Members by Name or Show**: Search for crew members or shows by part or entire name.

## Tech Stack

- Node.js
- TypeScript
- Express.js
- CSV Data Parsing (via a custom CSV parser)

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://npmjs.com/) (Node Package Manager, comes with Node.js)

Optionally, you can install `yarn` if you prefer it over `npm`.

## Installation

Follow these steps to get the API running locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/ManohariniA/bbc-crew-api.git
   cd bbc-crew-api
   ```

2. Install the dependencies:

   If you're using npm:

   ```bash
   npm install
   ```

   Or if you're using yarn:

   ```bash
   yarn install
   ```

## Running the API

Once the dependencies are installed, you can run the API locally.

### Development Mode

To start the development server with live reloading (using `ts-node-dev`):

```bash
npm run dev
```

Currently, the API reads data from a CSV file, which may not scale well for large datasets. Below are potential improvements that can make the API more production-ready:

Future Enhancements that are possible:

1. Use a Database Instead of CSV
   Migrate data storage from CSV files to a database such as PostgreSQL, MongoDB, or MySQL.
   This would improve performance, allow indexing, and enable complex queries.
2. Implement Authentication & Authorization
   Use JWT (JSON Web Tokens) for authentication.
   Implement role-based access control (RBAC) to restrict certain API endpoints to authenticated users only.
3. Add Pagination & Caching
   Introduce pagination for endpoints that return large datasets.
   Use Redis or a similar caching mechanism to reduce redundant data processing.
4. Improve Error Handling & Logging
   Implement a centralized error-handling middleware to provide consistent error responses.
   Use a logging service like Winston or Morgan to track API requests and errors.
5. Deploy to Cloud & Use CI/CD
   Deploy the API to a cloud provider like AWS, Azure, or Vercel.
   Implement CI/CD pipelines for automated testing and deployment.
   =======

# BBC Crew Members API

This project provides an API for managing crew members and their associated data. It includes endpoints for filtering crew members by show and searching for crew members or shows based on a query parameter.

## Features

- **Get All Crew Members**: Retrieve a list of all crew members.
- **Get All shows**: Retrieve a list of all shows and their data.
- **Get All departments**: Retrieve a list of all departments and their data.
- **Filter Crew Members by Show**: Filter crew members based on the show name.
- **Search Crew Members by Name or Show**: Search for crew members or shows by part or entire name.

## Tech Stack

- Node.js
- TypeScript
- Express.js
- CSV Data Parsing (via a custom CSV parser)

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://npmjs.com/) (Node Package Manager, comes with Node.js)

Optionally, you can install `yarn` if you prefer it over `npm`.

## Installation

Follow these steps to get the API running locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/ManohariniA/BBC-API.git
   cd BBC-API/bbc-api
   ```

2. Install the dependencies:

   If you're using npm:

   ```bash
   npm install
   ```

   Or if you're using yarn:

   ```bash
   yarn install
   ```

## Running the API

Once the dependencies are installed, you can run the API locally.

### Development Mode

To start the development server with live reloading (using `ts-node-dev`):

```bash
npm run dev
```

Currently, the API reads data from a CSV file, which may not scale well for large datasets. Below are potential improvements that can make the API more production-ready:

Future Enhancements that are possible:

1. Use a Database Instead of CSV
   Migrate data storage from CSV files to a database such as PostgreSQL, MongoDB, or MySQL.
   This would improve performance, allow indexing, and enable complex queries.
2. Implement Authentication & Authorization
   Use JWT (JSON Web Tokens) for authentication.
   Implement role-based access control (RBAC) to restrict certain API endpoints to authenticated users only.
3. Add Pagination & Caching
   Introduce pagination for endpoints that return large datasets.
   Use Redis or a similar caching mechanism to reduce redundant data processing.
4. Improve Error Handling & Logging
   Implement a centralized error-handling middleware to provide consistent error responses.
   Use a logging service like Winston or Morgan to track API requests and errors.
5. Deploy to Cloud & Use CI/CD
   Deploy the API to a cloud provider like AWS, Azure, or Vercel.
   Implement CI/CD pipelines for automated testing and deployment.

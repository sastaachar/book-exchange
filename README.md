# Book Exchange Platform

This project is a full-stack web application that allows users to lend, borrow, and exchange books within a community. It connects book lovers, enabling them to discover new reading material, share their favorite books, and engage in a book exchange network. The platform provides secure user authentication, advanced search capabilities, and an intuitive interface to manage transactions.

## Setup Instructions

### 1. Start PostgreSQL Server

First, start the PostgreSQL server:

```bash
sudo service postgresql start
```

### 2. Log in to PostgreSQL

Log into PostgreSQL using the postgres user:

```bash
sudo -u postgres psql postgres
```

### 3. Set up the Client

Navigate to the client folder and install the necessary dependencies:

```bash
cd client
npm install
```

### 4. Run the Development Server

To start the client application in development mode, run the following:

```bash
npm run dev
```

### 5. Set up the Backend

Navigate to the backend folder, install the required dependencies, and start the server:

```bash
cd backend
npm install
npm run start:dev
```

### 6. Open Prisma Studio

To view and manage your database schema, you can use Prisma Studio:

```bash
npx prisma studio
```

## API Endpoints

### Authentication Routes

- **POST /login**: Logs in an existing user.

  - Request body: `{ email, password }`
  - Response: User session and authentication token.

- **GET /is-logged-in**: Checks if the user is logged in.

  - Response: Returns user session status.

- **GET /logout**: Logs out the current user.
  - Response: User session ends and logout confirmation.

### Book Queue Routes

- **POST /create**: Creates a new book queue.

  - Request body: `{ title, description, etc. }`
  - Response: Book queue details, including a unique `bookQueueId`.

- **GET /:bookQueueId**: Fetches details of a specific book queue by its ID.

  - URL Parameters: `bookQueueId` (ID of the book queue)
  - Response: Book queue details.

- **POST /:bookQueueId/update**: Updates an existing book queue.

  - URL Parameters: `bookQueueId` (ID of the book queue)
  - Request body: `{ updated details }`
  - Response: Updated book queue details.

- **POST /search**: Searches for multiple book queues based on provided criteria.
  - Request body: `{ searchParams }`
  - Response: List of matching book queues.

### User Routes

- **POST /create**: Creates a new user account.

  - Request body: `{ name, email, password, etc. }`
  - Response: User details and confirmation.

- **POST /is-email-valid**: Checks if a provided email is valid and not already registered.

  - Request body: `{ email }`
  - Response: Email validity status.

- **POST /:userId**: Retrieves a specific user's profile.

  - URL Parameters: `userId` (ID of the user)
  - Response: User profile details.

- **POST /:userId/update**: Updates a specific user's profile.
  - URL Parameters: `userId` (ID of the user)
  - Request body: `{ updated details }`
  - Response: Updated user profile details.

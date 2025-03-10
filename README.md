# URL Shortener

A modern URL shortening service built with React, TypeScript, and Vite.

## Author

- [Niyigena Fiston Alvin](https://www.linkedin.com/in/fistonalvin/)

## 🚀 Features

- URL shortening with custom aliases
- Analytics for shortened URLs
- User authentication and management
- Responsive modern UI
- Docker support for easy deployment

## 🛠️ Tech Stack

- React 18
- TypeScript
- Vite
- Redux Toolkit for state management
- TailwindCSS for styling
- React Router for navigation
- Docker for containerization

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker (optional, for containerization)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd url-shortener-fn
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add necessary environment variables. You can find all required environment variables in `.env.example`:
   ```env
   VITE_LOCAL_API_URL=http://localhost:3000
   VITE_APP_BASE_URL=http://localhost:8080
   ```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will start at `http://localhost:8080`

### Production Build

```bash
npm run build
npm run preview
# or
yarn build
yarn preview
```

### Using Docker

```bash
# Build the container
docker compose build

# Run the container
docker compose up
```

## 🔐 Authentication

The application uses JWT (JSON Web Token) for authentication. Here's how it works:

1. **Registration**: 
   - Endpoint: `/api/auth/register`
   - Method: `POST`
   - Body: `{ email, password, name }`

2. **Login**:
   - Endpoint: `/api/auth/login`
   - Method: `POST`
   - Body: `{ email, password }`
   - Returns: `{ token, user }`

3. **Token Usage**:
   - Include the token in the Authorization header:
   ```
   Authorization: Bearer <your_token>
   ```

## 📡 API Documentation

### URL Shortening

1. **Create Short URL**
   - Endpoint: `/api/urls`
   - Method: `POST`
   - Body: 
     ```json
     {
       "long_url": "https://example.com",
     }
     ```
   - Response:
     ```json
     {
       "short_url": "http://short.url/abc123",
       "long_url": "https://example.com",
       "clicks": 0,
       "created_at": "2024-03-09T..."
     }
     ```

2. **Get URL Statistics**
   - Endpoint: `/api/urls/:id`
   - Method: `GET`
   - Response:
     ```json
     {
       "short_url": "http://short.url/abc123",
       "long_url": "https://example.com",
       "clicks": 42,
       "created_at": "2024-03-09T..."
     }
     ```

## 🧪 Testing

```bash
npm run test
# or
yarn test
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

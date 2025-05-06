# Weather Dashboard Backend

A robust NestJS API for the Weather Dashboard application.

## Features

- **Weather Data API**: Fetch current weather and forecasts
- **Location Management**: Save and organize favorite locations
- **User Authentication**: Register, login, and secure access to resources
- **MongoDB Integration**: Persistent data storage
- **API Documentation**: Swagger documentation for easy integration
- **JWT Authentication**: Token-based security
- **Error Handling**: Comprehensive error handling

## Tech Stack

- **NestJS**: Progressive Node.js framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Passport**: Authentication middleware
- **JWT**: Token-based authentication
- **Axios**: HTTP client for external API calls
- **Swagger**: API documentation
- **Jest**: Testing framework

## Prerequisites

- Node.js 14.x or higher
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/weather-dashboard-backend.git
cd weather-dashboard-backend
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following content:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/weather-dashboard
JWT_SECRET=your_jwt_secret_key
WEATHER_API_KEY=your_weatherapi_com_key
```

You'll need to get an API key from [WeatherAPI.com](https://www.weatherapi.com) to use the weather data features.

## Development

Start the development server:

```bash
npm run start:dev
# or
yarn start:dev
```

The API will be available at http://localhost:3000.

## Building for Production

Build the application for production:

```bash
npm run build
# or
yarn build
```

Run the production build:

```bash
npm run start:prod
# or
yarn start:prod
```

## Database Seeding

Seed the database with initial data:

```bash
npm run seed
# or
yarn seed
```

## Project Structure

```
src/
  ├── app.module.ts              # Main application module
  ├── main.ts                    # Application entry point
  ├── auth/                      # Authentication module
  │   ├── auth.controller.ts     # Auth endpoints
  │   ├── auth.service.ts        # Auth business logic
  │   ├── jwt.strategy.ts        # JWT authentication strategy
  │   └── dto/                   # Data transfer objects
  ├── users/                     # Users module
  │   ├── users.controller.ts    # User endpoints
  │   ├── users.service.ts       # User business logic
  │   └── schemas/               # Mongoose schemas
  ├── weather/                   # Weather module
  │   ├── weather.controller.ts  # Weather endpoints
  │   ├── weather.service.ts     # Weather business logic
  │   └── dto/                   # Data transfer objects
  ├── locations/                 # Locations module
  │   ├── locations.controller.ts # Location endpoints
  │   ├── locations.service.ts   # Location business logic
  │   └── schemas/               # Mongoose schemas
  └── common/                    # Shared resources
      └── filters/               # Exception filters
```

## API Endpoints

### Authentication
- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login a user and get a JWT token

### Weather
- `GET /weather`: Get current weather for a location
- `GET /weather/forecast`: Get weather forecast for a location

### Locations
- `GET /locations`: Get all saved locations for the current user
- `POST /locations`: Save a location for the current user
- `DELETE /locations/:id`: Delete a saved location

### Users
- `GET /users/:id`: Get user by ID (authenticated)

## Docker Support

The application includes Docker support for easy deployment.

Build and run with Docker Compose:

```bash
docker-compose up -d
```

This will start:
- The NestJS API on port 3000
- MongoDB on port 27017


# LinkSnip URL Shortener

LinkSnip is a modern URL shortening service built with Node.js, Express, and MongoDB. This application allows users to create shortened URLs, track visit analytics, and manage their links through a clean, responsive interface.

## Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **Visit Tracking**: Monitor how many times your shortened links have been visited
- **User Authentication**: Secure signup/login functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for storing URL and user data
- **Mongoose**: MongoDB object modeling tool
- **JWT**: JSON Web Tokens for authentication
- **MVC Architecture**: Model-View-Controller design pattern for clean code organization

### Frontend
- **EJS**: Embedded JavaScript templates for server-side rendering
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icon library

## Installation

1. Clone the repository
   ```
   git clone https://github.com/pravinpaudel/linksnip.git
   cd linksnip
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/linksnip
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the development server
   ```
   npm run dev
   ```

## API Routes

### URL Routes
- `POST /url` - Create a new shortened URL
- `GET /url/:shortId` - Redirect to original URL
- `GET /urls` - Get list of all URLs (requires authentication)

### User Routes
- `POST /user/signup` - Register a new user
- `POST /user/login` - Login user and generate JWT

## Models

### URL Model
```javascript
{
  shortId: String,
  originalUrl: String,
  visitHistory: [{ timestamp: Date }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}
```

### User Model
```javascript
{
  name: String,
  email: String,
  password: String
}
```

## Authentication Flow

1. User registers with email and password
2. Password is hashed before storage in database
3. On login, JWT token is generated and sent to client
4. Protected routes verify JWT token before granting access

## Future Enhancements

- Custom short URLs
- Advanced analytics (geographic data, referrers, etc.)
- QR code generation for shortened URLs
- Link expiration options
- Team collaboration features

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- UI design inspired by modern web applications and best practices
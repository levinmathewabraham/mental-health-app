const PORT = process.env.PORT || 5000; // Render will provide its own PORT
const CLIENT_URL = process.env.NODE_ENV === 'production'
  ? 'https://mental-health-app-frontend.onrender.com/'  // Replace with your actual frontend Render URL
  : 'http://localhost:3000';

// You might want to add this array of allowed origins
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://mental-health-app-frontend.onrender.com/',  // Replace with your actual frontend Render URL
  CLIENT_URL
];

module.exports = {
  PORT,
  CLIENT_URL,
  ALLOWED_ORIGINS
};

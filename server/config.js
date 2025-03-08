const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.NODE_ENV === 'production'
  ? 'https://mental-health-app-frontend.onrender.com//'  // Replace with your actual production client URL
  : 'http://localhost:3000';

module.exports = { PORT, CLIENT_URL };

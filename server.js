const express = require('express');
const app = express();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Your other routes
app.get('/', (req, res) => {
  res.send('Hello from simple Node app!');
});

// Start the server on an available port
const server = app.listen(0, () => {
  console.log(`Server running on port ${server.address().port}`);
});

// Export both app and server for testing
module.exports = { app, server };
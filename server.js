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

// Function to start the server
const startServer = (port = 3000) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${server.address().port}`);
  });
  return { app, server };
};

// Export the startServer function
module.exports = { startServer };

// Start the server if this file is run directly
if (require.main === module) {
  const { server } = startServer(3000);
}
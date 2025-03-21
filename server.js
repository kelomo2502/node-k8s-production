const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Your other routes
app.get('/', (req, res) => {
  res.send('Hello from simple Node app!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
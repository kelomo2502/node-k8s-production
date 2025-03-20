const request = require('supertest');
const app = require('../../server'); // Import your Express app

describe('GET /', () => {
  it('should return "Hello from simple Node app!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello from simple Node app!');
  });
});

describe('Server initialization', () => {
  it('should start and listen on the specified port', async () => {
    const server = app.listen(3000);
    expect(server).toBeDefined();
    server.close();
  });
});
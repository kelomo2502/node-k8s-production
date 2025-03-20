const request = require('supertest');
const app = require('../../server'); // Import your Express app

describe('Integration Tests', () => {
  let server;

  beforeAll(() => {
    // Start the server before running tests
    server = app.listen(3000);
  });

  afterAll(() => {
    // Close the server after tests are done
    server.close();
  });

  it('GET / should return "Hello from simple Node app!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello from simple Node app!');
  });

  it('GET /nonexistent should return 404', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
  });
});
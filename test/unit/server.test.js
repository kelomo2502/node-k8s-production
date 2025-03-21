const request = require('supertest'); // Import supertest
const { app, server } = require('../../server'); // Import app and server

describe('Unit Tests', () => {
  afterAll((done) => {
    // Close the server after tests are done
    server.close(done);
  });

  it('GET /health should return 200 OK', async () => {
    const response = await request(app).get('/health'); // Use request to make HTTP calls
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });
});
const request = require('supertest');
const { app, server } = require('../../server'); // Import both app and server

describe('Integration Tests', () => {
  beforeAll((done) => {
    // Server is already started in server.js, so no need to start it again
    done();
  });

  afterAll((done) => {
    // Close the server after tests are done
    server.close(done);
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
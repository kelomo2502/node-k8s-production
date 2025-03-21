const request = require('supertest');
const { startServer } = require('../../server'); // Import startServer

describe('Integration Tests', () => {
  let server;

  beforeAll((done) => {
    // Start the server before running tests
    const { server: srv } = startServer(3001);
    server = srv;
    server.on('listening', done);
  });

  afterAll((done) => {
    // Close the server after tests are done
    server.close(done);
  });

  it('GET / should return "Hello from simple Node app!"', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello from simple Node app!');
  });

  it('GET /nonexistent should return 404', async () => {
    const response = await request(server).get('/nonexistent');
    expect(response.status).toBe(404);
  });
});
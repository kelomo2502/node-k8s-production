const request = require('supertest');
const { startServer } = require('../../server'); // Import startServer

describe('Unit Tests', () => {
  let server;

  beforeAll((done) => {
    // Start the server before running tests
    const { server: srv } = startServer(3002);
    server = srv;
    server.on('listening', done);
  });

  afterAll((done) => {
    // Close the server after tests are done
    server.close(done);
  });

  it('GET /health should return 200 OK', async () => {
    const response = await request(server).get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });
});
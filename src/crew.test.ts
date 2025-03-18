import request from 'supertest';
import app from './server';

describe('Crew API Tests', () => {
  it('should return all crew members', async () => {
    const response = await request(app).get('/crew');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

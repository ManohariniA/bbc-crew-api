import request from 'supertest';
import app from './server';

describe('API Tests', () => {
  it('should add a new show', async () => {
    const res = await request(app)
      .post('/shows')
      .send({ name: 'The Office', budget: 500000 });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('The Office');
  });

  it('should return 400 for invalid show data', async () => {
    const res = await request(app).post('/shows').send({ name: '' });
    expect(res.status).toBe(400);
  });

  it('should add a crew member', async () => {
    const showRes = await request(app)
      .post('/shows')
      .send({ name: 'Friends', budget: 1000000 });

    const showId = showRes.body.id;

    const crewRes = await request(app)
      .post(`/shows/${showId}/crew`)
      .send({ name: 'John Doe', department: 'Lighting' });

    expect(crewRes.status).toBe(201);
    expect(crewRes.body.name).toBe('John Doe');
  });
});

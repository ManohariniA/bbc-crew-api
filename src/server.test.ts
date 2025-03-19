import request from 'supertest';
import app from './server';

describe('BBC API Endpoints', () => {
    
    test('GET / should return welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Welcome to the BBC API!');
    });

    test('GET /crew should return all crew members', async () => {
        const res = await request(app).get('/crew');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    test('GET /shows should return all shows', async () => {
        const res = await request(app).get('/shows');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    test('GET /departments should return all departments', async () => {
        const res = await request(app).get('/departments');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    test('GET /crewMembers should return crew members by show', async () => {
        const res = await request(app).get('/crewMembers?show=Fleabag');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    test('GET /crewMembers/search should return crew members matching name', async () => {
        const res = await request(app).get('/crewMembers/search?query=wizard');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});


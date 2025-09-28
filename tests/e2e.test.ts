const request = require('supertest');
const express = require('express');
const filesRoute = require('../src/routes/files');

const app = express();
app.use(filesRoute);

describe('GET /v1/files', () => {
  it('returns merged and sorted files', async () => {
    const res = await request(app).get('/v1/files?providers=bim360,procore&project=testproj');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('source');
    expect(res.body[0]).toHaveProperty('projectId');
  });
});

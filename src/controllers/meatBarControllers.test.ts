import request from 'supertest';

process.env.DB_PATH = ':memory:';

const { runQuery, initDb } = require('../db');
const app = require('../app').default;

describe('Meat Bar API', () => {
  beforeAll(async () => {
    initDb();

    await new Promise(resolve => setTimeout(resolve, 100));
    
    await runQuery('INSERT INTO people (id, name) VALUES (?, ?)', [1, 'Test Person']);
  });

  describe('POST /api/meatbars/consumptions', () => {
    it('should successfully add a consumption', async () => {
        const res = await request(app)
            .post('/api/meatbars/consumptions')
            .send({
                person_id: 1,
                type: 'bison',
            });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Consumption added');
    });

    it('should return 400 when one of the fields are missing', async () => {
        const res = await request(app)
            .post('/api/meatbars/consumptions')
            .send({});

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Missing required fields');
    });

    it('should return 404 when person_id does not exist', async () => {
      const res = await request(app)
          .post('/api/meatbars/consumptions')
          .send({
              person_id: 99999,
              type: 'beef'
          });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Person not found');
    });

  });
});
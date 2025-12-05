import request from 'supertest';

process.env.DB_PATH = ':memory:';

const { runQuery, initDb } = require('../db');
const app = require('../app').default;

describe('Meat Bar API', () => {
  beforeAll(async () => {
    initDb();

    await new Promise(resolve => setTimeout(resolve, 100));

    await runQuery('INSERT INTO people (id, name) VALUES (?, ?)', [1, 'Test Person']);

    await runQuery('INSERT INTO meat_bars (person_id, type, eaten_at) VALUES (?, ?, ?)', [1, 'beef', '2023-01-01T10:00:00Z']);

    await runQuery('INSERT INTO meat_bars (person_id, type, eaten_at) VALUES (?, ?, ?)', [1, 'beef', '2023-01-02T10:00:00Z']);
    await runQuery('INSERT INTO meat_bars (person_id, type, eaten_at) VALUES (?, ?, ?)', [1, 'beef', '2023-01-02T11:00:00Z']);

    await runQuery('INSERT INTO meat_bars (person_id, type, eaten_at) VALUES (?, ?, ?)', [1, 'beef', '2023-01-03T10:00:00Z']);
    await runQuery('INSERT INTO meat_bars (person_id, type, eaten_at) VALUES (?, ?, ?)', [1, 'beef', '2023-01-03T11:00:00Z']);
    await runQuery('INSERT INTO meat_bars (person_id, type, eaten_at) VALUES (?, ?, ?)', [1, 'beef', '2023-01-03T12:00:00Z']);

    await runQuery('INSERT INTO meat_bars (person_id, type, eaten_at) VALUES (?, ?, ?)', [1, 'beef', '2023-01-04T10:00:00Z']);

    await runQuery('INSERT INTO meat_bars (person_id, type, eaten_at) VALUES (?, ?, ?)', [1, 'beef', '2023-02-01T10:00:00Z']);

    for (let i = 0; i < 5; i++) {
        await runQuery('INSERT INTO meat_bars (person_id, type, eaten_at) VALUES (?, ?, ?)', [1, 'beef', '2023-02-05T10:00:00Z']);
    }


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

  it('GET /api/meatbars/streaks should return correct streaks', async () => {
    const res = await request(app).get('/api/meatbars/streaks');
    expect(res.status).toBe(200);

    const streaks = res.body;
    expect(streaks.length).toBeGreaterThan(0);
    const streak = streaks.find((s: any) => s.start === '2023-01-01');
    expect(streak).toBeDefined();
    expect(streak.end).toBe('2023-01-03');
  });

  it('GET /api/meatbars/month-peak should return correct peak for month', async () => {
    const res = await request(app).get('/api/meatbars/month-peak');
    expect(res.status).toBe(200);
    const peaks = res.body;

    expect(peaks['2023-02']).toBeDefined();
    expect(peaks['2023-02'].day).toBe('2023-02-05');
    expect(peaks['2023-02'].count).toBe(5);
});


});
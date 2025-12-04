import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = process.env.DB_PATH || path.resolve(__dirname, '../meatbar.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

export const initDb = () => {
    db.serialize(() => {
        db.run(`
      CREATE TABLE IF NOT EXISTS people (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
      )
    `);

        db.run(`
      CREATE TABLE IF NOT EXISTS meat_bars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        person_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        eaten_at TEXT NOT NULL,
        FOREIGN KEY (person_id) REFERENCES people (id)
      )
    `);
    });
};

export default db;
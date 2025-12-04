import fs from 'fs';
import path from 'path';
import db, { initDb, runQuery, getQuery } from '../db';

const csvPath = path.resolve(__dirname, '../../data.csv');

const seed = async () => {
    initDb();

    await new Promise(resolve => setTimeout(resolve, 1000));

    const data = fs.readFileSync(csvPath, 'utf-8');
    const lines = data.trim().split('\n').slice(1);

    const peopleMap = new Map<string, number>();

    for (const line of lines) {
        const [name, type, date] = line.split(',');

        if (!name || !type || !date) continue;

        if (!peopleMap.has(name)) {
            try {
                await runQuery('INSERT OR IGNORE INTO people (name) VALUES (?)', [name]);
                const row: any = await getQuery('SELECT id FROM people WHERE name = ?', [name]);
                if (row) {
                    peopleMap.set(name, row.id);
                }
            } catch (err) {
                console.error(`Error processing person ${name}:`, err);
            }
        }

        const personId = peopleMap.get(name);
        if (personId) {
            try {
                await runQuery('INSERT INTO meat_bars (person_id, type, eaten_at) VALUES (?, ?, ?)', [personId, type, date]);
            } catch (err) {
                console.error(`Error inserting meat bar for ${name}:`, err);
            }
        }
    }

    process.exit(0);
};

seed();

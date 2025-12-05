import { Request, Response } from "express";
import { getAllQuery, getQuery, runQuery } from "../db";

export const getPeople = async (req: Request, res: Response) => {
  try {
    const people = await getAllQuery("SELECT * FROM people");
    console.log(people);
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch people" });
  }
};

export const addConsumption = async (req: Request, res: Response) => {

  const { person_id, type } = req.body;

  if (!person_id || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingPerson = await getQuery('SELECT id FROM people WHERE id = ?', [person_id]);

    if (!existingPerson || existingPerson.length === 0) {
      res.status(404).json({error: "Person not found"});
      return;
    }

    const eaten_at = new Date().toISOString();
    const result = await runQuery(
      "INSERT INTO meat_bars (person_id, type, eaten_at) VALUES (?, ?, ?)",
      [person_id, type, eaten_at]
    );
    res.status(201).json({ message: 'Consumption added' });
  } catch (error) {
    res.status(500).json({ error: "Failed to add consumption record" });
  }
};

export const getConsumptions = async (req: Request, res: Response) => {
  try {
    const consumptions = await getAllQuery("SELECT * FROM meat_bars");
    res.json(consumptions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch consumptions" });
  }
};

export const getStreaks = async (req: Request, res: Response) => {
  try {
      const dailyCounts = await getAllQuery(`
        SELECT date(eaten_at) as day, count(*) as count 
        FROM meat_bars 
        GROUP BY day 
        ORDER BY day ASC
      `);

      const streaks: { start: string; end: string; length: number }[] = [];
      let currentStreak: { day: string; count: number }[] = [];

      for (const dayData of dailyCounts) {
          if (currentStreak.length === 0) {
              currentStreak.push(dayData);
          } else {
              const last = currentStreak[currentStreak.length - 1];
              if (dayData.count > last.count) {
                  currentStreak.push(dayData);
              } else {
                  if (currentStreak.length > 1) {
                      streaks.push({
                          start: currentStreak[0].day,
                          end: currentStreak[currentStreak.length - 1].day,
                          length: currentStreak.length
                      });
                  }
                  currentStreak = [dayData];
              }
          }
      }

      if (currentStreak.length > 1) {
          streaks.push({
              start: currentStreak[0].day,
              end: currentStreak[currentStreak.length - 1].day,
              length: currentStreak.length
          });
      }

      res.json(streaks);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to calculate streaks' });
  }
};
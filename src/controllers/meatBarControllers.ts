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
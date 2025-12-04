import { Request, Response } from "express";
import { getAllQuery, runQuery } from "../db";

export const getPeople = async (req: Request, res: Response) => {
  try {
    const people = await getAllQuery("SELECT * FROM people");
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch people" });
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
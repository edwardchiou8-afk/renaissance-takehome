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
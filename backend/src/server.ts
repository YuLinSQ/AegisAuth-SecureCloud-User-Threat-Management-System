import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

app.use(cors());
app.use(express.json());

// Helper to read DB
const readDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

// Helper to write DB
const writeDB = (data: any) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Get all users
app.get('/api/users', (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.users);
});

// Add a user
app.post('/api/users', (req: Request, res: Response) => {
  const db = readDB();
  const newUser = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json(newUser);
});

// Get all alerts
app.get('/api/alerts', (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.alerts);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('AegisAuth API is running. Visit /api/users or /api/alerts.');
});

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

// Update a user
app.put('/api/users/:id', (req: Request, res: Response) => {
  const db = readDB();
  const { id } = req.params;
  const index = db.users.findIndex((u: any) => u.id === id);
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...req.body };
    writeDB(db);
    res.json(db.users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete a user
app.delete('/api/users/:id', (req: Request, res: Response) => {
  const db = readDB();
  const { id } = req.params;
  const filteredUsers = db.users.filter((u: any) => u.id !== id);
  if (filteredUsers.length !== db.users.length) {
    db.users = filteredUsers;
    writeDB(db);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Get all alerts
app.get('/api/alerts', (req: Request, res: Response) => {
  const db = readDB();
  res.json(db.alerts);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

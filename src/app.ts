import express from 'express';
import { initDb } from './db';
import meatbarRoutes from './routes/meatbarRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

initDb();

app.use('/api/meatbars', meatbarRoutes);

export default app;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

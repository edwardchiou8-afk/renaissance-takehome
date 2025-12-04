import express from 'express';
import { initDb } from './db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

initDb();

export default app;

if ( require.main === module ) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
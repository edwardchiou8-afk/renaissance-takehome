import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

export default app;

if ( require.main === module ) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
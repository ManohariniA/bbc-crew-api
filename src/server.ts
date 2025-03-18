import './csvparser';
import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

export default app;

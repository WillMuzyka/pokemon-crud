import 'reflect-metadata';
import 'dotenv/config';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';

import '@shared/container';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

if (process.env.DB_SRV) {
  const { DB_SRV } = process.env;

  mongoose.connect(DB_SRV);
  const db = mongoose.connection;
  // eslint-disable-next-line no-console
  db.on('error', console.error.bind(console, 'MongoDB connection error'));
}

app.use(routes);
app.use(errors());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else if (err instanceof SyntaxError) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid JSON format',
    });
  } else {
    console.error(err); //eslint-disable-line

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
  next(err);
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server is running on port 3333!');
});

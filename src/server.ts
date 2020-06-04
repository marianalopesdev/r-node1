import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const api = express();

api.use(express.json());
api.use('/files', express.static(uploadConfig.directory));
api.use(routes);

api.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error, okurrr?',
    })
});

api.listen('3334', () => {
    console.log('DinossauroRobot.Org');
});

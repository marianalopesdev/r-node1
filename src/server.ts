import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import './database';

const api = express();
api.use(express.json());
api.use(routes);

api.listen('3334', () => {
    console.log('DinossauroRobot.Org');
});

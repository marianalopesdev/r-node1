import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';

const api = express();
api.use(express.json());
api.use('/files', express.static(uploadConfig.directory));
api.use(routes);

api.listen('3334', () => {
    console.log('DinossauroRobot.Org');
});

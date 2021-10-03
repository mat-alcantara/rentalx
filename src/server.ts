import express from 'express';
import swagger from 'swagger-ui-express';
import 'reflect-metadata';
import './database';
import './shared/container';

import { routes } from './routes';
import swagerConfig from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swagerConfig));

app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});

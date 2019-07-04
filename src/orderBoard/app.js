import express from 'express';
import {handler} from './orders/handlers/index';

const app = express();
app.use(express.urlencoded());
app.use('/', (req, res, next) => {
  // req.setHeaders('Content-Type', 'application/json');
  res.set('Content-Type', 'application/json');
  next();
})
app.use('/orders', handler);


module.exports = app;
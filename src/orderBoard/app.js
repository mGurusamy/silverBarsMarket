import express from 'express';
import {handler} from './orders/handlers/index';

const app = express();
app.use('/orders', handler);

module.exports = app;
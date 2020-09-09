/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
// import winston from 'winston';
import users from './routes/users';

import { startConnection } from './config/mongoose-config';


require('dotenv').config();
const app = express();
const logs = fs.createWriteStream((path.join(__dirname, 'access.log')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get('/', (req, res) => {
  res.status(200).send('#%&& $*&');
});
app.use(morgan('combined', { stream: logs }));

app.use('/user', users);

console.log(process.env.NODE_ENV);
console.log(process.env.PORT);
console.log(process.env.DB_DEV);


if (!module.parent) {
  app.listen(process.env.PORT);
  startConnection();
}
// console.log(app);
module.exports = app;

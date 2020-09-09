import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
// import winston from 'winston';
import authors from './routes/authors';
import books from './routes/books';
import cors from 'cors'

// import config from 'dotenv';

// require('dotenv').config();

const app = express();
// const port = process.env.PORT;
if (process.env.NODE_ENV === 'development') {
  process.env.DB = 'test1';
}

const logs = fs.createWriteStream((path.join(__dirname, 'access.log')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});
app.get('/', (req, res) => {
  res.status(200).send('#%&& $*&');
});
app.use(morgan('combined', { stream: logs }));

app.use('/authors', authors);
app.use('/books', books);

console.log(process.env.PORT);

console.log(process.env.DB);

if (!module.parent) {
  app.listen(process.env.PORT || 3000);
}
// console.log(app);
module.exports = app;

import Router from 'express';
import { startConnection } from '../config/mysql-config';
import {
  getBooks, updateBooks, getBooksById, insertBooks, deleteBooks,
} from '../database/booksQueries';


const books = new Router();

const pool = startConnection();

// books.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next()
// });

books.get('/', async (req, res) => {
  const booksArr = await getBooks(pool);
  res.json(booksArr);
});

books.post('/add', async (req, res) => {
  const result = await insertBooks(pool, req.body);
  if (result.affectedRows === 1) {
    res.json(result);
  } else {
    res.status(400).send('404 error');
  }
});

books.put('/:id', async (req, res) => {
  const result = await updateBooks(pool, req.body, req.params.id);
  if (result.affectedRows === 1) {
    res.json(result);
  } else {
    res.status(400).send('404 error');
  }
});

books.get('/:id', async (req, res) => {
  const result = await getBooksById(pool, req.params.id);
  res.json(result);
});

books.delete('/:id', async (req, res) => {
  const result = await deleteBooks(pool, req.params.id);
  if (result.affectedRows === 1) {
    res.json(result);
  } else {
    res.status(400).send('400 error');
  }
});
module.exports = books;

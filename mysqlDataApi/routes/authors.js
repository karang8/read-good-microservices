/* eslint-disable no-unused-vars */
import Router from 'express';
import { startConnection } from '../config/mysql-config';
import {
  getAuthors, getAuthorsById, insertAuthors, updateAuthors, deleteAuthors,
} from '../database/authorsQueries';


const pool = startConnection();
const authors = new Router();

authors.get('/', async (req, res) => {
  const authorsArr = await getAuthors(pool);
  console.log(JSON.stringify(authorsArr));
  res.json(authorsArr);
});

authors.post('/add', async (req, res) => {
  const result = await insertAuthors(pool, req.body);
  if (result.affectedRows === 1) {
    res.json(result);
  } else {
    res.status(400).send('400 error');
  }
});

authors.get('/:id', async (req, res) => {
  try {
    const authorsArr = await getAuthorsById(pool, req.params.id);
    res.json(authorsArr);
    res.send('success');
  } catch (error) {
    console.log(`error in finding this id${error}`);
  }
});

authors.put('/:id', async (req, res) => {
  const result = await updateAuthors(pool, req.body, req.params.id);
  if (result.affectedRows === 1) {
    res.json(result);
  } else {
    res.status(400).send('400 error');
  }
});

authors.delete('/:id', async (req, res) => {
  const result = await deleteAuthors(pool, req.params.id);
  if (result.affectedRows === 1) {
    res.json(result);
  } else {
    res.status(400).send('400 error');
  }
});


module.exports = authors;

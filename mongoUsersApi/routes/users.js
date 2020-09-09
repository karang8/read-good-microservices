/* eslint-disable no-console */
import Router from 'express';
import jwt from 'jsonwebtoken';
import { signUp, signIn, getUser } from '../database/mongoQueries';
// import config from '../config';

const { check, validationResult } = require('express-validator');

const users = new Router();

users.get('/signup', (req, res) => {
  res.send('signup');
});

users.post('/signup', [
  check('email').isEmail().withMessage('Not a valid Email-id'),
  check('password')
    .isLength({
      min: 3,
      max: 20,
    }).withMessage('Password should be between [3,20]'),
// eslint-disable-next-line consistent-return
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    return res.status(422).json({ msg: err[0].msg, status: 422 });
  }
  try {
    const response = await signUp(req.body);
    jwt.sign(
      { id: response.id },
      'mysecret',
      { expiresIn: 3600 },
      (err, token) => {
        console.log('here in jwt');
        if (err) throw err;
        res.json({
          token,
          user: {
            id: response.id,
            fname: response.fname,
            lname: response.lname,
            email: response.email,
          },
        });
      },
    );
    // res.json(jsonResponseData);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ msg: error.message, status: error.error_code });
  }
});

users.get('/info', async (req, res) => {
  // console.log(req);
  try {
    const user = await getUser(req.body.user.id);
    console.log(user)
    res.json(user)
  } catch (error) {
    console.log(error);
  }
});

users.post('/signin', async (req, res) => {
  try {
    const response = await signIn(req.body);
    // console.log(user);
    jwt.sign(
      { id: response.id },
      'mysecret',
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: response.id,
            fname: response.fname,
            lname: response.lname,
            email: response.email,
          },
        });
      },
    );
  } catch (error) {
    console.log(error.err, 'in catch');
    res.status(error.error_code).send(error.message);
  }
});

module.exports = users;

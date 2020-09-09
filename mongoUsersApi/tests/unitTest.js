/* eslint-disable no-console */
/* eslint-disable no-undef */
import { expect } from 'chai';
import Mongoose from 'mongoose';
import {
  SignUp, SignIn 
} from '../database/mongoQueries';
import { startConnection } from '../config/mongoose-config';

require('dotenv').config();

console.log(process.env.NODE_ENV);
console.log(process.env.DB_TEST);


before(() => {
  startConnection(process.env.DB_TEST);
  console.log('Connection Created');
});

after(async () => {
  await Mongoose.connection.db.dropCollection('users');
  console.log('Collection Deleted');
  await Mongoose.disconnect();
  console.log('Disconnected');
});

describe('Signup', () => {
  it('this should sign the user up', async () => {
    const signupData = {
      fname: 'aaaa',
      lname: 'aaaa',
      email: 'a4@gmail.com',
      password: 'hello1234',
    };

    const result = {
      fname: 'aaaa',
      lname: 'aaaa',
      email: 'a4@gmail.com',
    };
    const response = await SignUp(signupData);
    const res = {
      fname: response.fname,
      lname: response.lname,
      email: response.email,
    };
    expect(res).deep.equal(result);
  });

  it('this should sign in the user', async () => {
    const signinData = {
      email: 'a4@gmail.com',
      password: 'hello1234',
    };

    const result = {
      fname: 'aaaa',
      lname: 'aaaa',
    };
    const response = await SignIn(signinData);
    const res = {
      fname: response.fname,
      lname: response.lname,
    };
    expect(res).deep.equal(result);
  });

  it('this should throw error for email', async () => {
    const signinData = {
      email: 'a4@gmail.co',
      password: 'hello1234',
    };

    const result = 'The email does not exist';
    try {
      await SignIn(signinData);
    } catch (error) {
      const response = error.message;
      expect(response).deep.equal(result);
    }
  });
  it('this should throw error for password', async () => {
    const signinData = {
      email: 'a4@gmail.com',
      password: 'hello123',
    };

    const result = 'The password is invalid';
    try {
      await SignIn(signinData);
    } catch (error) {
      const response = error.message;
      expect(response).deep.equal(result);
    }
  });
});

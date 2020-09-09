/* eslint-disable no-console */
/* eslint-disable no-undef */
import supertest from 'supertest';
import mongoose from 'mongoose'
import User from '../models/user';
import { startConnection } from '../config/mongoose-config';
require('dotenv').config();
const app = require('../server');
// mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

before(() => {
  startConnection(process.env.DB_TEST);
});

after(async () => {
  await User.deleteOne({ email: 'a3@gmail.com' }).exec();
  mongoose.disconnect();
  console.log('User deleted');
});

describe('Post /signup', () => {
  it('it should has status code 422', (done) => {
    supertest(app)
      .post('/user/signup')
      .send({
        fname: 'aaaa',
        lname: 'aaaa',
        email: 'a3gmail.com',
        password: 'hello1234',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    // eslint-disable-next-line quote-props
      .expect(422, {
        errors: [
          {
            value: 'a3gmail.com',
            msg: 'Not a valid Email-id',
            param: 'email',
            location: 'body',
          },
        ],
      }, done);
  });

  it('it should has status code 422', (done) => {
    supertest(app)
      .post('/user/signup')
      .send({
        fname: 'aaaa',
        lname: 'aaaa',
        email: 'a3@gmail.com',
        password: 'he',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    // eslint-disable-next-line quote-props
      .expect(422, {
        errors: [
          {
            value: 'he',
            msg: 'Password should be between [3,20]',
            param: 'password',
            location: 'body',
          },
        ],
      }, done);
  });

  it('it should has status code 200', (done) => {
    supertest(app)
      .post('/user/signup')
      .send({
        fname: 'aaaa',
        lname: 'aaaa',
        email: 'a3@gmail.com',
        password: 'hello1234',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    // eslint-disable-next-line quote-props
      .expect(200, {
        fname: 'aaaa',
        lname: 'aaaa',
        email: 'a3@gmail.com',
      }, done);
  });

  it('it should has status code 409', (done) => {
    supertest(app)
      .post('/user/signup')
      .send({
        fname: 'aaaa',
        lname: 'aaaa',
        email: 'a3@gmail.com',
        password: 'hello1234',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
    // eslint-disable-next-line quote-props
      .expect(409, {
        driver: true,
        name: 'MongoError',
        index: 0,
        code: 11000,
        errmsg: 'E11000 duplicate key error collection: test2.users index: email_1 dup key: { : "a3@gmail.com" }',
      }, done);
  });

  it('it should has status code 200', (done) => {
    supertest(app)
      .post('/user/signin')
      .send({
        email: 'a3@gmail.com',
        password: 'hello1234',
      })
    // eslint-disable-next-line quote-props
      .expect(200, {
        fname: 'aaaa',
        lname: 'aaaa',
      }, done);
  });

  it('it should has status code 401', (done) => {
    supertest(app)
      .post('/user/signin')
      .send({
        email: 'a34554@gmail.com',
        password: 'hello1234',
      })
    // eslint-disable-next-line quote-props
      .expect(401, 'The email does not exist', done);
  });

  it('it should has status code 401', (done) => {
    supertest(app)
      .post('/user/signin')
      .send({
        email: 'a3@gmail.com',
        password: 'hello123',
      })
    // eslint-disable-next-line quote-props
      .expect(401, 'The password is invalid', done);
  });
});

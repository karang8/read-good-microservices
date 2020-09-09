/* eslint-disable quote-props */
/* eslint-disable no-undef */
import supertest from 'supertest';

const { exec } = require('child-process-promise');

const app = require('../../server');

if (process.env.NODE_ENV === 'test') {
  process.env.DB = 'test2';
}


before((done) => {
  console.log(`${process.env.DB}beforeeach`);
  // function execute()
  exec(`npm run migration root ${process.env.DB}`)
    .then((result) => {
      console.log(result.stdout);
      console.log(result.stderr);
      done();
    });
});
// console.log(app);
describe('GET /', () => {
  it('it should has status code 200', (done) => {
    supertest(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('GET /books', () => {
  it('it should has status code 200', (done) => {
    supertest(app)
      .get('/books')
      .expect((res) => {
        const tempResponse = {};
        const bodyReturned = res.body[0];
        tempResponse.B_ID = bodyReturned.B_ID;
        res.body = tempResponse;
        console.log(res.body);
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { 'B_ID': 1 }, done);
  });
});

describe('Post /books/add', () => {
  it('it should has status code 200', (done) => {
    supertest(app)
      .post('/books/add')
      .send({
        Name: 'ppp',
        B_img: 'https://images.gr-assets.com/books/1413706054l/18007564.jpg',
        A_ID: 2,
        Summary: 'hdksfhhklasdfhksdfjd',
        ISBN: 9646465,
      })
      .expect((res) => {
        const key = 'affectedRows';
        const obj = {};
        obj[key] = res.body.affectedRows;
        res.body = obj;
        console.log(res.body);
      })
      // eslint-disable-next-line quote-props
      .expect(200, { 'affectedRows': 1 }, done);
  });
});

describe('Update /books/', () => {
  it('it should has status code 200', (done) => {
    supertest(app)
      .put('/books/7')
      .send({
        Summary: 'dsaf',
        ISBN: 5656,
      })
      .expect((res) => {
        const key = 'affectedRows';
        const obj = {};
        obj[key] = res.body.affectedRows;
        res.body = obj;
        console.log(res.body);
      })
    // eslint-disable-next-line quote-props
      .expect(200, { 'affectedRows': 1 }, done);
  });
  it('it should has status code 400', (done) => {
    supertest(app)
      .put('/books/14')
      .send({
        Summary: '',
        ISBN: '',
      })
    // eslint-disable-next-line quote-props
      .expect(400, done);
  });
});

describe('delelte book', () => {
  it('it should has status code 200', (done) => {
    supertest(app)
      .delete('/books/7')
      .expect((res) => {
        const key = 'affectedRows';
        const obj = {};
        obj[key] = res.body.affectedRows;
        res.body = obj;
        console.log(res.body);
      })
    // eslint-disable-next-line quote-props
      .expect(200, { 'affectedRows': 1 }, done);
  });
  it('it should has status code 400', (done) => {
    supertest(app)
      .delete('/books/10')
    // eslint-disable-next-line quote-props
      .expect(400, done);
  });
});

describe('Post /books/add ', () => {
  it('it should has status code 400', (done) => {
    supertest(app)
      .post('/books/add')
      .send({
        Name: '',
        B_img: '',
        A_ID: '',
        Summary: '',
        ISBN: '',
      })
    // eslint-disable-next-line quote-props
      .expect(400, done);
  });
});

describe('GET /authors', () => {
  it('it should has status code 200', (done) => {
    supertest(app)
      .get('/authors')
      .set('Accept', 'application')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('Post /authors/add', () => {
  it('it should has status code 200', (done) => {
    supertest(app)
      .post('/authors/add')
      .send({
        'Name': 'Ray ',
        'DOB': '1920-08-21',
        'Born': 'in Waukegan, Illinois, The United ',
        'Website': 'dsd',
        'A_img': 'hdsf',
      })
      .expect((res) => {
        const key = 'affectedRows';
        const obj = {};
        obj[key] = res.body.affectedRows;
        res.body = obj;
        console.log(res.body);
      })
      // eslint-disable-next-line quote-props
      .expect(200, { 'affectedRows': 1 }, done);
  });
  it('it should has status code 400', (done) => {
    supertest(app)
      .post('/authors/add')
      .send({
        'Name': '',
        'DOB': '',
        'Born': '',
        'Website': '',
        'A_img': '',
      })
    // eslint-disable-next-line quote-props
      .expect(400, done);
  });
});

describe('delelte author', () => {
  it('it should has status code 200', (done) => {
    supertest(app)
      .delete('/authors/2')
      .expect((res) => {
        const key = 'affectedRows';
        const obj = {};
        obj[key] = res.body.affectedRows;
        res.body = obj;
        console.log(res.body);
      })
    // eslint-disable-next-line quote-props
      .expect(200, { 'affectedRows': 1 }, done);
  });
  it('it should has status code 400', (done) => {
    supertest(app)
      .delete('/authors/100')
    // eslint-disable-next-line quote-props
      .expect(400, done);
  });
});

describe('Update /author/', () => {
  it('it should has status code 200', (done) => {
    supertest(app)
      .put('/authors/4')
      .send({
        'Born': 'abcd',
      })
      .expect((res) => {
        const key = 'affectedRows';
        const obj = {};
        obj[key] = res.body.affectedRows;
        res.body = obj;
        console.log(res.body);
      })
    // eslint-disable-next-line quote-props
      .expect(200, { 'affectedRows': 1 }, done);
  });
  it('it should has status code 400', (done) => {
    supertest(app)
      .put('/authors/4')
      .send({
        Summary: '',
        ISBN: '',
      })
    // eslint-disable-next-line quote-props
      .expect(400, done);
  });
});

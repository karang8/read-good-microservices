// import supertest from 'supertest';

// const { exec } = require('child-process-promise');

// const app = require('../../server');

// if (process.env.NODE_ENV === 'test') {
//   process.env.DB = 'test2';
// }

// before((done) => {
//     console.log(`${process.env.DB}beforeeach`);
//     // function execute()
//     exec(`npm run migration root ${process.env.DB}`)
//       .then((result) => {
//         console.log(result.stdout);
//         console.log(result.stderr);
//         done();
//       });
//   });
// describe('GET /books', () => {
//     it('it should has status code 200', (done) => {
//       supertest(app)
//         .get('/books')
//         .expect((res) => {
//           const tempResponse = {};
//           const bodyReturned = res.body[0];
//           tempResponse.B_ID = bodyReturned.B_ID;
//           res.body = tempResponse;
//         })
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, { 'B_ID': 1 }, done);
//     });
//   });
  
//   describe('Post /books/add', () => {
//     it('it should has status code 200', (done) => {
//       supertest(app)
//         .post('/books/add')import supertest from 'supertest';

// const { exec } = require('child-process-promise');

// const app = require('../../server');

// if (process.env.NODE_ENV === 'test') {
//   process.env.DB = 'test2';
// }

// before((done) => {
//     console.log(`${process.env.DB}beforeeach`);
//     // function execute()
//     exec(`npm run migration root ${process.env.DB}`)
//       .then((result) => {
//         console.log(result.stdout);
//         console.log(result.stderr);
//         done();
//       });
//   });
// describe('GET /books', () => {
//     it('it should has status code 200', (done) => {
//       supertest(app)
//         .get('/books')
//         .expect((res) => {
//           const tempResponse = {};
//           const bodyReturned = res.body[0];
//           tempResponse.B_ID = bodyReturned.B_ID;
//           res.body = tempResponse;
//         })
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, { 'B_ID': 1 }, done);
//     });
//   });
  
//   describe('Post /books/add', () => {
//     it('it should has status code 200', (done) => {
//       supertest(app)
//         .post('/books/add')
//         .send({
//           Name: 'ppp',
//           B_img: 'https://images.gr-assets.com/books/1413706054l/18007564.jpg',
//           A_ID: 2,
//           Summary: 'hdksfhhklasdfhksdfjd',
//           ISBN: 9646465,
//         })
//         .expect((res) => {
//           const key = 'affectedRows';
//           const obj = {};
//           obj[key] = res.body.affectedRows;
//           res.body = obj;
//           console.log(res.body);
//         })
//         // eslint-disable-next-line quote-props
//         .expect(200, { 'affectedRows': 1 }, done);
//     });
//   });
  
//   describe('Update /books/', () => {
//     it('it should has status code 200', (done) => {
//       supertest(app)
//         .put('/books/7')
//         .send({
//           Summary: 'dsaf',
//           ISBN: 5656,
//         })
//         .expect((res) => {
//           const key = 'affectedRows';
//           const obj = {};
//           obj[key] = res.body.affectedRows;
//           res.body = obj;
//           console.log(res.body);
//         })
//       // eslint-disable-next-line quote-props
//         .expect(200, { 'affectedRows': 1 }, done);
//     });
//     it('it should has status code 400', (done) => {
//       supertest(app)
//         .put('/books/14')
//         .send({
//           Summary: '',
//           ISBN: '',
//         })
//       // eslint-disable-next-line quote-props
//         .expect(400, done);
//     });
//   });
  
//   describe('delelte book', () => {
//     it('it should has status code 200', (done) => {
//       supertest(app)
//         .delete('/books/7')
//         .expect((res) => {
//           const key = 'affectedRows';
//           const obj = {};
//           obj[key] = res.body.affectedRows;
//           res.body = obj;
//           console.log(res.body);
//         })
//       // eslint-disable-next-line quote-props
//         .expect(200, { 'affectedRows': 1 }, done);
//     });
//     it('it should has status code 400', (done) => {
//       supertest(app)
//         .delete('/books/10')
//       // eslint-disable-next-line quote-props
//         .expect(400, done);
//     });
//   });
  
//   describe('Post /books/add ', () => {
//     it('it should has status code 400', (done) => {
//       supertest(app)
//         .post('/books/add')
//         .send({
//           Name: '',
//           B_img: '',
//           A_ID: '',
//           Summary: '',
//           ISBN: '',
//         })
//       // eslint-disable-next-line quote-props
//         .expect(400, done);
//     });
//   });
//         .send({
//           Name: 'ppp',
//           B_img: 'https://images.gr-assets.com/books/1413706054l/18007564.jpg',
//           A_ID: 2,
//           Summary: 'hdksfhhklasdfhksdfjd',
//           ISBN: 9646465,
//         })
//         .expect((res) => {
//           const key = 'affectedRows';
//           const obj = {};
//           obj[key] = res.body.affectedRows;
//           res.body = obj;
//           console.log(res.body);
//         })
//         // eslint-disable-next-line quote-props
//         .expect(200, { 'affectedRows': 1 }, done);
//     });
//   });
  
//   describe('Update /books/', () => {
//     it('it should has status code 200', (done) => {
//       supertest(app)
//         .put('/books/7')
//         .send({
//           Summary: 'dsaf',
//           ISBN: 5656,
//         })
//         .expect((res) => {
//           const key = 'affectedRows';
//           const obj = {};
//           obj[key] = res.body.affectedRows;
//           res.body = obj;
//           console.log(res.body);
//         })
//       // eslint-disable-next-line quote-props
//         .expect(200, { 'affectedRows': 1 }, done);
//     });
//     it('it should has status code 400', (done) => {
//       supertest(app)
//         .put('/books/14')
//         .send({
//           Summary: '',
//           ISBN: '',
//         })
//       // eslint-disable-next-line quote-props
//         .expect(400, done);
//     });
//   });
  
//   describe('delelte book', () => {
//     it('it should has status code 200', (done) => {
//       supertest(app)
//         .delete('/books/7')
//         .expect((res) => {
//           const key = 'affectedRows';
//           const obj = {};
//           obj[key] = res.body.affectedRows;
//           res.body = obj;
//           console.log(res.body);
//         })
//       // eslint-disable-next-line quote-props
//         .expect(200, { 'affectedRows': 1 }, done);
//     });
//     it('it should has status code 400', (done) => {
//       supertest(app)
//         .delete('/books/10')
//       // eslint-disable-next-line quote-props
//         .expect(400, done);
//     });
//   });
  
//   describe('Post /books/add ', () => {
//     it('it should has status code 400', (done) => {
//       supertest(app)
//         .post('/books/add')
//         .send({
//           Name: '',
//           B_img: '',
//           A_ID: '',
//           Summary: '',
//           ISBN: '',
//         })
//       // eslint-disable-next-line quote-props
//         .expect(400, done);
//     });
//   });
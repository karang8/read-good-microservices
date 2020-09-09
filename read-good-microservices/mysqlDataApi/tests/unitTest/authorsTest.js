/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import { expect } from 'chai';
import { startConnection } from '../../config/mysql-config';
import {
  getAuthors, insertAuthors, updateAuthors, deleteAuthors,
} from '../../database/authorsQueries';

if (process.env.NODE_ENV === 'test') {
  process.env.DB = 'test2';
}

console.log(`${process.env.DB}top`);
let data = [
  {
    A_ID: 1,
    Name: 'Ray Bradbury',
    DOB: '1920-08-21T18:30:00.000Z',
    Born: 'in Waukegan, Illinois, The United States',
    Website: '',
    A_img: 'https://images.gr-assets.com/authors/1445955959p5/1630.jpg',
  },
  {
    A_ID: 2,
    Name: 'Andy Weir',
    DOB: '1972-06-15T18:30:00.000Z',
    Born: 'Davis, California, United States',
    Website: '',
    A_img: 'https://images.gr-assets.com/authors/1382592903p5/6540057.jpg',
  },
  {
    A_ID: 3,
    Name: 'Kim Stanley Robinson',
    DOB: '1952-03-22T18:30:00.000Z',
    Born: ' in Waukegen, Illinois, The United States ',
    Website: '',
    A_img: 'https://images.gr-assets.com/authors/1376955089p5/1858.jpg',
  },
  {
    A_ID: 4,
    Name: 'Robert Zubrin',
    DOB: '1952-04-08T18:30:00.000Z',
    Born: 'in Lakewood, Colorado, United States',
    Website: '',
    A_img: 'http://www.fightforspace.com/wp-content/uploads/2012/07/Zubrin.jpg',
  },
  {
    A_ID: 5,
    Name: 'H.G. Wells',
    DOB: '1866-09-20T18:30:00.000Z',
    Born: 'in Bromley, Kent, England, The United Kingdom',
    Website: 'http://hgwellssociety.com/',
    A_img: 'https://images.gr-assets.com/authors/1547736853p5/880695.jpg',
  },
  {
    A_ID: 7,
    Name: 'Chris Hadfield',
    DOB: '1959-08-28T18:30:00.000Z',
    Born: 'in Sarnia, Canada ',
    Website: 'http://chrishadfield.ca ',
    A_img: 'https://images.gr-assets.com/authors/1372880368p5/1136925.jpg',
  },
  {
    A_ID: 8,
    Name: 'Meg Howrey',
    DOB: '1976-06-10T18:30:00.000Z',
    Born: 'Los Angeles',
    Website: ' http://meghowrey.com ',
    A_img: 'https://images.gr-assets.com/authors/1332945182p5/4228949.jpg',
  },
];
// const data = require('../authors.json');
// console.log(data);  s
const { exec } = require('child-process-promise');

beforeEach((done) => {
  console.log(`${process.env.DB}beforeeach`);
  // function execute()
  exec(`npm run migration root ${process.env.DB}`)
    .then((result) => {
      console.log(result.stdout);
      console.log(result.stderr);
      done();
    });
});


describe('AuthorsGet', () => {
  it('it should get all the authors', (done) => {
    const pool = startConnection();
    getAuthors(pool)
      .then((result) => {
        result = JSON.stringify(result);
        data = JSON.stringify(data);
        console.log('here in then');
        expect(result).deep.equal(data);
        // console.log(res);
        done();
      }).catch((error) => {
        console.log('in catch');
        console.log(error);
        done();
      });
  });
});

describe('AuthorsInsert', () => {
  it('it should insert the author', (done) => {
    const pool = startConnection();
    let result;
    const body = {
      Name: 'Raaaa',
      DOB: '1920-08-21',
      Born: 'in Waukegan, Illinois, The United States',
      Website: 'abcd',
      A_img: 'dsklfj',
    };
    insertAuthors(pool, body)
      .then((res) => {
        console.log(res);
        result = res.affectedRows;
        console.log(result);
        expect(result).to.deep.equal(1);
        done();
      });
  });
});

describe('AuthorsUpdate', () => {
  it('it should update the author', (done) => {
    const pool = startConnection();
    let result;
    const body = {
      Website: 'abcde',
      A_img: 'dsklfjq',
    };
    updateAuthors(pool, body, 3)
      .then((res) => {
        console.log(res);
        result = res.affectedRows;
        console.log(result);
        expect(result).to.deep.equal(1);
        done();
      });
  });
});

describe('AuthorsDelete', () => {
  it('it should delete the author', (done) => {
    const pool = startConnection();
    let result;
    deleteAuthors(pool, 3)
      .then((res) => {
        console.log(res);
        result = res.affectedRows;
        console.log(result);
        expect(result).to.deep.equal(1);
        done();
      });
  });
});

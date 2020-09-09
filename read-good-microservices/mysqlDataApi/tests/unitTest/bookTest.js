/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable quote-props */
import { expect } from 'chai';
import { startConnection } from '../../config/mysql-config';
import {
  getBooks, insertBooks, updateBooks, deleteBooks,
} from '../../database/booksQueries';

if (process.env.NODE_ENV === 'test') {
  process.env.DB = 'test2';
}

let data2 = [
  {
    bookName: 'The Martian ',
    'B_ID': 1,
    B_img: 'https://images.gr-assets.com/books/1413706054l/18007564.jpg',
    A_ID: 2,
    Name: 'Andy Weir',
    DOB: '1972-06-15T18:30:00.000Z',
    'Born': 'Davis, California, United States',
    'Website': '',
    'A_img': 'https://images.gr-assets.com/authors/1382592903p5/6540057.jpg',
  },
  {
    bookName: 'The Martian Chronicles',
    B_ID: 2,
    B_img: 'https://images.gr-assets.com/books/1374049948l/76778.jpg',
    'A_ID': 1,
    'Name': 'Ray Bradbury',
    'DOB': '1920-08-21T18:30:00.000Z',
    'Born': 'in Waukegan, Illinois, The United States',
    Website: '',
    A_img: 'https://images.gr-assets.com/authors/1445955959p5/1630.jpg',
  },
  {
    'bookName': 'Red Mars',
    'B_ID': 3,
    'B_img': 'https://images.gr-assets.com/books/1440699787l/77507.jpg',
    A_ID: 3,
    'Name': 'Kim Stanley Robinson',
    DOB: '1952-03-22T18:30:00.000Z',
    'Born': ' in Waukegen, Illinois, The United States ',
    'Website': '',
    A_img: 'https://images.gr-assets.com/authors/1376955089p5/1858.jpg',
  },
  {
    'bookName': 'The Case for Mars',
    B_ID: 4,
    B_img: 'https://images.gr-assets.com/books/1438253741l/56713.jpg',
    A_ID: 5,
    'Name': 'H.G. Wells',
    DOB: '1866-09-20T18:30:00.000Z',
    Born: 'in Bromley, Kent, England, The United Kingdom',
    'Website': 'http://hgwellssociety.com/',
    'A_img': 'https://images.gr-assets.com/authors/1547736853p5/880695.jpg',
  },
  {
    'bookName': 'Blue Mars',
    B_ID: 5,
    B_img: 'https://images.gr-assets.com/books/1429497319l/77504.jpg',
    'A_ID': 3,
    Name: 'Kim Stanley Robinson',
    'DOB': '1952-03-22T18:30:00.000Z',
    Born: ' in Waukegen, Illinois, The United States ',
    'Website': '',
    'A_img': 'https://images.gr-assets.com/authors/1376955089p5/1858.jpg',
  },
  {
    bookName: 'The Wanderers',
    'B_ID': 7,
    B_img: 'https://images.gr-assets.com/books/1469411034l/29966530.jpg',
    A_ID: 8,
    'Name': 'Meg Howrey',
    'DOB': '1976-06-10T18:30:00.000Z',
    Born: 'Los Angeles',
    'Website': ' http://meghowrey.com ',
    A_img: 'https://images.gr-assets.com/authors/1332945182p5/4228949.jpg',
  }];

describe('BookssGet', () => {
  it('it should get all the books', (done) => {
    const pool = startConnection();
    getBooks(pool)
      .then((result) => {
        result = JSON.stringify(result);
        data2 = JSON.stringify(data2);
        console.log('here in then');
        expect(result).deep.equal(data2);
        // console.log(res);
        done();
      }).catch((error) => {
        console.log('in catch');
        console.log(error);
        done();
      });
  });
});


describe('BooksInsert', () => {
  it('it should insert the book', (done) => {
    const pool = startConnection();
    let result;
    const body = {
      'Name': 'ppp',
      'B_img': 'https://images.gr-assets.com/books/1413706054l/18007564.jpg',
      'A_ID': 2,
      Summary: 'hdksfhhklasdfhksdfjd',
      'ISBN': 9646465,
    };
    insertBooks(pool, body)
      .then((res) => {
        console.log(res);
        result = res.affectedRows;
        console.log(result);
        expect(result).to.deep.equal(1);
        done();
      });
  });
});

describe('BooksUpdate', () => {
  it('it should update the book', (done) => {
    const pool = startConnection();
    let result;
    const body = {
      Name: 'abcde',
      B_img: 'dsklfjq',
    };
    updateBooks(pool, body, 3)
      .then((res) => {
        console.log(res);
        result = res.affectedRows;
        console.log(result);
        expect(result).to.deep.equal(1);
        done();
      });
  });
});

describe('BooksDelete', () => {
  it('it should delete the book', (done) => {
    const pool = startConnection();
    let result;
    deleteBooks(pool, 3)
      .then((res) => {
        console.log(res);
        result = res.affectedRows;
        console.log(result);
        expect(result).to.deep.equal(1);
        done();
      });
  });
});

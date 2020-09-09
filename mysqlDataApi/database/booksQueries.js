
exports.getBooks = async (pool) => {
  const [arrOfJoinAuthorBooks] = await pool.query('SELECT Books.Name as bookName, Books.B_ID ,Books.B_img,authors.* FROM authors JOIN Books ON Books.A_ID=authors.A_ID');
  return new Promise((resolve) => {
    resolve(arrOfJoinAuthorBooks);
  });
};

exports.updateBooks = async (pool, body, id) => {
  let result;
  try {
    result = await pool.query('UPDATE `Books` SET ? WHERE B_ID = ?', [body, id]);
    return result[0];
  } catch (error) {
    console.log(`error in updating the authors${error}`);
    return error;
  }
};

exports.getBooksById = async (pool, id) => {
  const [rows] = await pool.query('SELECT Books.B_ID, Books.Name as bookName, authors.Name as authorName , Books.A_ID, Books.Summary, Books.B_img, Books.ISBN FROM `Books`,`authors` WHERE Books.A_ID = authors.A_ID && `B_ID`=?', [id]);
  return new Promise((resolve) => {
    resolve(rows);
  });
};

exports.insertBooks = async (pool, body) => {
  let result;
  try {
    result = await pool.execute('INSERT INTO Books SET Name = ?, A_ID=?, Summary = ?, ISBN=?, B_img=? ', [body.Name, body.A_ID, body.Summary, body.ISBN, body.B_img]);
    return result[0];
  } catch (error) {
    console.log('in catch insert');
    return error;
  }
};

exports.deleteBooks = async (pool, id) => {
  let result;
  try {
    result = await pool.query('DELETE FROM `Books` WHERE B_ID = ?', [id]);
    return result[0];
  } catch (error) {
    console.log(`error in deleting the author${error}`);
    return error;
  }
};

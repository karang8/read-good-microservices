exports.getAuthors = async (pool) => {
  const [rows] = await pool.execute('SELECT * FROM `authors`');
  return new Promise((resolve) => {
    resolve(rows);
  });
};

exports.getAuthorsById = async (pool, id) => {
  const [arrOfJoinAuthorBooks] = await pool.execute('SELECT Books.Name as bookName, Books.B_ID ,Books.B_img,authors.* FROM authors JOIN Books ON Books.A_ID=authors.A_ID WHERE authors.A_ID=?', [id]);
  // const resultAuthorByID = arrOfJoinAuthorBooks[0];
  return new Promise((resolve) => {
    resolve(arrOfJoinAuthorBooks);
  });
};

exports.insertAuthors = async (pool, body) => {
  let result;
  try {
    result = await pool.execute('INSERT INTO authors SET `Name` =?,`DOB`= ?, `Website` = ?, `Born`= ?,`A_img`=?', [body.Name, body.DOB, body.Website, body.Born, body.A_img]);
    await pool.execute('SELECT A_ID FROM `authors` WHERE `Website`=?', [body.Website]);
    // console.log(result);
    // console.log(id[0].A_ID);
    return result[0];
  } catch (error) {
    console.log(`error in inserting authors:${error}`);
    return error;
  }
};

exports.updateAuthors = async (pool, body, id) => {
  let result;
  try {
    result = await pool.query('UPDATE `authors` SET ? WHERE A_ID = ?', [body, id]);
    return result[0];
  } catch (error) {
    console.log(`error in updating the authors${error}`);
    return error;
  }
};

exports.deleteAuthors = async (pool, id) => {
  let result;
  try {
    result = await pool.query('DELETE FROM `authors` WHERE A_ID = ?', [id]);
    return result[0];
  } catch (error) {
    return error;
  }
};

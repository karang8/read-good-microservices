exports.getBooks = async (pool) => {
  const [arrOfJoinAuthorBooks] = await pool.query('SELECT Books.Name as bookName, Books.B_ID ,Books.B_img,authors.* FROM authors JOIN Books ON Books.A_ID=authors.A_ID');
  return new Promise((resolve) => {
    resolve(arrOfJoinAuthorBooks);
  });
};

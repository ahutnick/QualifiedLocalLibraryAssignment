function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter(book => book.borrows.some(borrow => !borrow.returned));
  const available = books.filter(book => book.borrows.every(borrow => borrow.returned));
  return [borrowed, available];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = accounts.reduce((result, account) => {
    if (result === 0) result = [];
    if (result.length >= 10) return result;
    const { borrows } = book;
    const { id, name, picture, age, company, email, registered} = account;
    const borrowRecord = borrows.find((borrow) => borrow.id === id)
    if (borrowRecord != undefined) {
      const returned = borrowRecord.returned;
      const profile = { id, returned, name, picture, age, company, email, registered };
      result.push(profile);
    }
    return result;
  }, []);
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

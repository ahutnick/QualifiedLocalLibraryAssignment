const authorById = require("./books").findAuthorById;

function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => {
    return accountA.name.last < accountB.name.last ? -1 : 1;
  });
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  const total = books.reduce((result, book) => {
    const { borrows } = book;
    if (typeof(result) != "number") result = 0;
    if (borrows.some(borrow => borrow.id === account.id)) result++;
    return result;
  }, 0);
  return total;
}

function getBorrowsFromAccount(account, books) {
  const borrowed = books.reduce((result, book) => {
    const { borrows } = book;
    if (result === 0) result = [];
    if (borrows.find((borrow) => borrow.id === account.id && !borrow.returned) != undefined) {
      result.push(book);
    } 
    return result;
  }, []);
  return borrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = getBorrowsFromAccount(account, books);
  const possessed = borrowedBooks.reduce((result, book) => {
    if (result === 0) result = [];
    const { id, title, genre, authorId, borrows } = book;
    const author = authorById(authors, book.authorId);
    const nextBook = { id, title, genre, authorId, author, borrows };
    result = [...result, nextBook];
    return result;
  }, []);
  return possessed;


}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

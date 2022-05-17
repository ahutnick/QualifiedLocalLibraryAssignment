const getBookById = require("./books").getBookById;

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const total = books.reduce((result, book) => {
    if (typeof(result) != "number") result = 0;
    if (book.borrows.some(borrow => !borrow.returned)) result++;
    return result;
  }, 0);
  return total;
}

function genreCounter(books) {
  const genreCounts = books.reduce((result, book) => {
    const genre = book.genre;
    if (result === 0) result = {};
    if (result[genre] === undefined) result[genre] = 0;
    result[genre]++;
    return result;
  }, {});
  return genreCounts;
}

function getMostCommonGenres(books) {
  const counts = genreCounter(books);
  const genres = Object.keys(counts);
  genres.sort((genreA, genreB) => counts[genreA] > counts[genreB] ? -1 : 1);
  const [first, second, third, fourth, fifth] = genres;
  const topFive = [
    { name: first, count: counts[first] }, 
    { name: second, count: counts[second] },
    { name: third, count: counts[third] },
    { name: fourth, count: counts[fourth] },
    { name: fifth, count: counts[fifth] }
    ];
  return topFive;
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => {
    const { title, borrows } = book;
    return { name: title, count: borrows.length }
  }) 
  popularBooks.sort((bookA, bookB) => bookA.count > bookB.count ? -1 : 1);
  if (popularBooks.length > 5) popularBooks.length = 5 
  return popularBooks
}

function checkoutByAuthor(books, author) {
  const popularity = books.reduce((result, book) => {
    if (typeof(result) != "number") result = 0;
    if (book.authorId === author.id) result += book.borrows.length;
    return result;
  }, 0);
  return { name: `${author.name.first} ${author.name.last}`, count: popularity };
}

function getMostPopularAuthors(books, authors) {
  const authorsList = authors.reduce((result, author) => {
    if (result === 0) result = [];
    result.push(checkoutByAuthor(books, author));
    return result;
  }, []);
  authorsList.sort((authorA, authorB) => authorA.count > authorB.count ? -1 : 1);
  if (authorsList.length > 5) authorsList.length = 5; 
  return authorsList;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

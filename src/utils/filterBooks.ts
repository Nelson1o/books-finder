import { TBooksItems } from "../types/types";

export const filterBooks = (books: TBooksItems[]) => {
  const idBooks = new Set(books.map((book) => book.id));
  return books.filter((book) => {
    if (idBooks.has(book.id)) {
      idBooks.delete(book.id);
      return true;
    } else {
      return false;
    }
  });
};

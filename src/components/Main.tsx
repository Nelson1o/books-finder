import React from "react";
import { useAppSelector } from "../store/hooks";

const Main: React.FC = () => {
  const { amount, books } = useAppSelector((state) => state.books);

  return (
    <>
      {amount > 0 && <div className="found">Found {amount} books</div>}
      {books.length > 0 && (
        <div className="card">
          {books.map((book) => (
            <div className="card-item" key={book.id} onClick={() => console.log(book.id)}>
              <img src={book.volumeInfo.imageLinks?.smallThumbnail} alt="bookImg" />
              <div className="card-item__categories">{book.volumeInfo?.categories}</div>
              <div className="card-item__title">{book.volumeInfo?.title}</div>
              <div className="card-item__author">{book.volumeInfo?.authors}</div>
            </div>
          ))}
        </div>
      )}
      {books.length > 0 && (
        <div className="find">
          <button className="find__btn" onClick={() => console.log("123")}>
            Find more
          </button>
        </div>
      )}
    </>
  );
};

export default Main;

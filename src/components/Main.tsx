import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import Loader from "./Loader";

const Main: React.FC = () => {
  const { amount, books, status } = useAppSelector((state) => state.books);

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          {amount > 0 && <div className="found">Found {amount} books</div>}
          {books.length > 0 && (
            <div className="card">
              {books.map((book) => (
                <div className="card-item" key={book.id}>
                  <Link to={`/book/${book.id}`}>
                    <img src={book.volumeInfo.imageLinks?.smallThumbnail} alt="bookImg" />
                  </Link>
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
      )}
    </>
  );
};

export default Main;

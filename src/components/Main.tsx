import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMoreBooks, setIndex } from "../store/slices/bookSlice";
import Loader from "./Loader";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const { amount, books, status } = useAppSelector((state) => state.books);

  const getMoreBooks = () => {
    dispatch(setIndex(true));
    dispatch(fetchMoreBooks());
  };

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          {amount > 0 && <div className="found">Found {amount} results</div>}
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
              <button className="find__btn" onClick={getMoreBooks}>
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

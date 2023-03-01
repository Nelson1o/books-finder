import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { findBookOnId } from "../store/slices/bookSlice";
import Loader from "./Loader";

const FullBook = () => {
  const dispatch = useAppDispatch();
  const { choosenBooks } = useAppSelector((state) => state.books);

  const { id } = useParams();

  useEffect(() => {
    dispatch(findBookOnId(id));
  }, []);

  if (!choosenBooks) {
    return <Loader />;
  }

  return (
    <div className="book-item">
      <div className="book-item__img">
        <img src={choosenBooks?.volumeInfo.imageLinks.smallThumbnail} alt="bookImg" />
      </div>
      <div className="book-item__descr">
        <div className="book-item__descr-categories">{choosenBooks?.volumeInfo.categories}</div>
        <div className="book-item__descr-title">{choosenBooks?.volumeInfo.title}</div>
        <div className="book-item__descr-autors">{choosenBooks?.volumeInfo.authors}</div>
        <Link to={"/"}>
          <svg
            className="book-item__descr-close"
            data-name="Livello 1"
            id="Livello_1"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title />
            <path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z" />
            <path d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default FullBook;

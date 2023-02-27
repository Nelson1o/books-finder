import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchBooks, setSearchValue } from "../store/slices/bookSlice";
import Select from "./Select";

const categories = ["all", "art", "biography", "computers", "history", "medical", "poetry"];
const sorts = ["relevance", "newest"];

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.books);

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  const getBooks = () => {
    dispatch(fetchBooks());
  };

  return (
    <div className="header">
      <label htmlFor="search-input" className="header-title">
        Search for books
      </label>
      <div className="header-search">
        <input
          type="text"
          id="search-input"
          autoFocus
          placeholder="JavaScript"
          value={searchValue}
          onChange={onChangeSearchValue}
        />
        <svg
          onClick={getBooks}
          className="header-search__icon-search"
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      </div>
      <div className="header-select">
        <Select title="Categories" items={categories} name="categoriesSelect" />
        <Select title="Sorting by" items={sorts} name="sortBySelect" />
      </div>
    </div>
  );
};

export default Header;

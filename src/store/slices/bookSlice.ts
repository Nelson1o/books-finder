import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { IBookSlice, Status, TFetchBooks } from "../../types/types";

const initialState: IBookSlice = {
  searchValue: "",
  categoryType: "all",
  sortBy: "relevance",
  startIndex: 0,
  status: Status.SUCCESS,
  amount: 0,
  books: [],
  choosenBooks: undefined,
};

const key = "AIzaSyDsIZw3kW5_2_wqSSWSqM1rD9abyj-GPOI";

export const fetchBooks = createAsyncThunk<TFetchBooks, void, { state: RootState }>(
  "book/fetchBooks",
  async (_, { getState }) => {
    const state = getState();
    const { data } = await axios.get<TFetchBooks>(
      `https://www.googleapis.com/books/v1/volumes?q=${state.books.searchValue}&orderBy=${state.books.sortBy}&printType=${state.books.categoryType}&maxResults=20&startIndex=0&key=${key}`
    );
    return data;
  }
);

export const fetchMoreBooks = createAsyncThunk<TFetchBooks, void, { state: RootState }>(
  "book/fetchMoreBooks",
  async (_, { getState }) => {
    const state = getState();
    const { data } = await axios.get<TFetchBooks>(
      `https://www.googleapis.com/books/v1/volumes?q=${state.books.searchValue}&orderBy=${state.books.sortBy}&printType=${state.books.categoryType}&maxResults=20&startIndex=${state.books.startIndex}&key=${key}`
    );
    return data;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setParamsSearch: (state, action: PayloadAction<string[]>) => {
      const [value, name] = action.payload;

      if (name === "categoriesSelect") {
        state.categoryType = value;
      } else {
        state.sortBy = value;
      }
    },
    findBookOnId: (state, action: PayloadAction<string | undefined>) => {
      state.choosenBooks = state.books.find((book) => book.id === action.payload);
    },
    setIndex: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.startIndex += 20;
      } else {
        state.startIndex = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.amount = action.payload.totalItems;
      state.books = action.payload.items;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.books = [];
    });
    builder.addCase(fetchMoreBooks.pending, (state, action) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchMoreBooks.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.amount = action.payload.totalItems;
      state.books = [...state.books, ...action.payload.items];
    });
    builder.addCase(fetchMoreBooks.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.books = [];
    });
  },
});

export const { setSearchValue, setParamsSearch, findBookOnId, setIndex } = bookSlice.actions;
export default bookSlice.reducer;

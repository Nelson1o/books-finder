import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type TImageLinks = {
  smallThumbnail: string;
};

type TVolumeInfo = {
  imageLinks: TImageLinks;
  categories: string;
  title: string;
  authors: string;
};

type TBooksItems = {
  id: string;
  volumeInfo: TVolumeInfo;
};

interface IBookSlice {
  searchValue: string;
  categoryType: string;
  sortBy: string;
  startIndex: number;
  status: Status;
  amount: number;
  books: TBooksItems[];
}

const initialState: IBookSlice = {
  searchValue: "",
  categoryType: "all",
  sortBy: "relevance",
  startIndex: 0,
  status: Status.SUCCESS,
  amount: 0,
  books: [],
};

type TFetchBooks = {
  totalItems: number;
  items: TBooksItems[];
};

export const key = "AIzaSyDsIZw3kW5_2_wqSSWSqM1rD9abyj-GPOI";

export const fetchBooks = createAsyncThunk<TFetchBooks, void, { state: RootState }>(
  "book/fetchBooks",
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
  },
});

export const { setSearchValue, setParamsSearch } = bookSlice.actions;
export default bookSlice.reducer;

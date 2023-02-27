import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface IBookSlice {
  searchValue: string;
  categoryType: string;
  sortBy: string;
  startIndex: number;
  status: string;
}

const initialState: IBookSlice = {
  searchValue: "",
  categoryType: "all",
  sortBy: "relevance",
  startIndex: 0,
  status: "success",
};

export const key = "AIzaSyDsIZw3kW5_2_wqSSWSqM1rD9abyj-GPOI";

export const fetchBooks = createAsyncThunk("book/fetchBooks", async (_, { getState }) => {
  const state: any = getState();
  const { data } = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${state.books.searchValue}&orderBy=${state.books.sortBy}&printType=${state.books.categoryType}&maxResults=20&startIndex=${state.books.startIndex}&key=${key}`
  );
  return data;
});

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
      state.status = "loading";
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = "success";
      console.log(action.payload);
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export const { setSearchValue, setParamsSearch } = bookSlice.actions;
export default bookSlice.reducer;

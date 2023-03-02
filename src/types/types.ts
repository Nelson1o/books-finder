export enum Status {
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
  description: string;
};

export type TBooksItems = {
  id: string;
  volumeInfo: TVolumeInfo;
};

export type TFetchBooks = {
  totalItems: number;
  items: TBooksItems[];
};

export interface IBookSlice {
  searchValue: string;
  categoryType: string;
  sortBy: string;
  startIndex: number;
  status: Status;
  amount: number;
  books: TBooksItems[];
  choosenBooks: TBooksItems | undefined;
}

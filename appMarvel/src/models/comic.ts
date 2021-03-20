export interface IUrl {
  type: string;
  url: string;
}

export interface IPrice {
  price: number;
  type: string;
}

export interface IDate {
  date: string;
  type: string;
}

export interface ICreator {
  name: string;
  role: string;
}

export interface IResult {
  id: number;
  title: string;
  description?: string;
  pageCount: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  creators: {
    items: ICreator[];
  };
  dates: IDate[];
  prices: IPrice[];
  urls: IUrl[];
}

export interface IResponseData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: IResult[];
}

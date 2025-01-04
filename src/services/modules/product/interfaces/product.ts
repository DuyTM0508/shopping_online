export interface InitialFilterProduct {
  PageSize: number;
  CurrentPage: number;
  TextSearch: string;
  Status: number;
  Category: string;
  MinPrice: number;
  MaxPrice: number;
  SortColumn: string;
  SortDirection: string;
}

export interface IProductRequest {
  PageSize: number;
  CurrentPage: number;
  TextSearch: string;
  Status: number;
  Category: string;
  MinPrice: number;
  MaxPrice: number;
  SortColumn: string;
  SortDirection: string;
}

export interface IProductList {
  Object: {
    ProductList: ProductList[];
  };
  Total: number;
  PageSize: number;
  CurrentPage: number;
}

export interface ProductList {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
  PublishedDate: Date;
  FullName: string;
  Category: string;
  Image: string;
  Quantity: number;
}

export interface Response<T> {
  data: T;
}

export type ResponseGetListProduct = Response<IProductList>;

export interface IProductDetail {
  Object: ProductDetail;
}

export interface ProductDetail {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
  PublishedDate: Date;
  FullName: string;
  Category: string;
  Image: string;
  FileList: string[];
  Rating: number | undefined;
  Reviews: number;
  Quantity: number;
}

export type ResponseGetDetailProduct = Response<IProductDetail>;

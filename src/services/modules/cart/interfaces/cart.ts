export interface ICart {
  Object: CartList[];
}

export interface CartList {
  CartId: string;
  ProductId: string;
  ProductName: string;
  Image: string;
  Price: number;
  Status: number;
  Quantity: number;
}
export interface Response<T> {
  data: T;
}

export type ResponseGetListCart = Response<ICart>;

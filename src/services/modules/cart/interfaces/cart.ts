export interface CartList {
  Object: {
    cart: Cart[];
    Total: number;
  };
}

export interface Cart {
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

export type ResponseGetListCart = Response<CartList>;

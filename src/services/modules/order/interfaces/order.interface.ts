export interface IOrder {
  Object: Object;
}

export interface Object {
  OrderList: OrderList[];
}

export interface OrderList {
  ID: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  OrderCode: number;
  Status: number;
  CreatedDate: Date;
}

export interface Response<T> {
  data: T;
}

export type ResponseGetOrder = Response<IOrder>;

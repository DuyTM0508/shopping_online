export interface ICategory {
  Status: number;
  StatusCode: number;
  Object: IListCategory[];
  isOk: boolean;
  isError: boolean;
}

export interface IListCategory {
  Id: string;
  Name: string;
}

export interface ILoginRequest {
  Email: string;
  Password: string;
}

export interface ILoginResponse {
  ID: string;
  UserID: string;
  AccountID: string;
  Avatar: string;
  Username: string;
  FullName: string;
  Position: null;
  Birthday: null;
  PhoneNumber: string;
  Email: string;
  WardID: number;
  Sex: number;
  DistrictID: number;
  ProvinceID: number;
  Address: null;
  Identification: null;
  Fax: null;
  IsRememberPassword: boolean;
  Token: string;
  ExpiredDate: Date;
  CreateDate: Date;
  TimeUpdateExpiredDateToDB: Date;
  Language: null;
  IpAddress: string;
  AccountType: number;
  FileUrl: null;
  AccountName: null;
  RoleType: number;
  FullAddress: null;
  IsFirstLogin: boolean;
  OrganCode: null;
}

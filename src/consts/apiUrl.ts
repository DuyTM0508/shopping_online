const ROOT_URL = import.meta.env.VITE_BASE_URL;

export const API_CITY_URL = "https://vietnamese-administration.vercel.app/city";
export const API_DISTRICT_URL =
  "https://vietnamese-administration.vercel.app/district?cityId=";
export const API_WARD_URL =
  "https://vietnamese-administration.vercel.app/ward?districtId=";
// Dont remove this command
// ImportAPIURL
export const USER_URL = `${ROOT_URL}/user`;

// Auth
export const LOGIN_URL = `${ROOT_URL}/Authservice/login`;

// Product
export const PRODUCT_URL = `${ROOT_URL}/Product/GetListProduct`;
export const PRODUCT_DETAIL_URL = `${ROOT_URL}/Product/GetProductDetail`;
export const ADD_NEW_PRODUCT_URL = `${ROOT_URL}/Product/InsertProduct`;
export const UPDATE_PRODUCT_URL = `${ROOT_URL}/Product/UpdateProduct`;

// Cart
export const CART_URL_ID = `${ROOT_URL}/Cart/GetSessionId`;
export const START_SESSION_URL = `${ROOT_URL}/Cart/StartSession`;
export const ADD_TO_CART_URL = `${ROOT_URL}/Cart/AddToCart`;
export const GET_CART_URL = `${ROOT_URL}/Cart/GetListCart`;
export const REMOVE_CART_URL = `${ROOT_URL}/Cart/RemoveCart`;
export const REMOVE_ALL_CART_URL = `${ROOT_URL}/Cart/RemoveAllCart`;

// Order
export const ORDER_URL = `${ROOT_URL}/Order`;
export const PAYMENT_SUCCESS_URL = `${ROOT_URL}/Order/GetPaymentSuccess`;
export const PAYMENT_FAILED_URL = `${ROOT_URL}/Order/GetPaymentFail`;
export const LIST_ORDER_URL = `${ROOT_URL}/Order/GetListOrder`;

// Category
export const CATEGORY_URL = `${ROOT_URL}/Category`;

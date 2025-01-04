const ROOT_URL = import.meta.env.VITE_BASE_URL;

// Dont remove this command
// ImportAPIURL
export const USER_URL = `${ROOT_URL}/user`;

// Auth
export const LOGIN_URL = `${ROOT_URL}/Authservice/login`;

// Product
export const PRODUCT_URL = `${ROOT_URL}/Product/GetListProduct`;
export const PRODUCT_DETAIL_URL = `${ROOT_URL}/Product/GetProductDetail`;

// Cart
export const CART_URL_ID = `${ROOT_URL}/Cart/GetSessionId`;
export const START_SESSION_URL = `${ROOT_URL}/Cart/StartSession`;
export const ADD_TO_CART_URL = `${ROOT_URL}/Cart/AddToCart`;
export const GET_CART_URL = `${ROOT_URL}/Cart/GetListCart`;

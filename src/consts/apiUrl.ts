const ROOT_URL = import.meta.env.VITE_BASE_URL;

// Dont remove this command
// ImportAPIURL
export const USER_URL = `${ROOT_URL}/user`;

// Auth
export const LOGIN_URL = `${ROOT_URL}/Authservice/login`;

// Product
export const PRODUCT_URL = `${ROOT_URL}/Product/GetListProduct`;
export const PRODUCT_DETAIL_URL = `${ROOT_URL}/Product/GetProductDetail`;

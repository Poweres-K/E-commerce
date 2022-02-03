import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSideBarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSideBarOpen: false };
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, isloading: true, isError: false };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featuredProducts = action.payload.filter(
      (products) => products.featured
    );
    return {
      ...state,
      isloading: false,
      products: action.payload,
      featuredProducts,
    };
  }

  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, isloading: false, isError: true };
  }

  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return { ...state, isloading: false, isError: true };
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return { ...state, isloading: true, isError: false };
  }

  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return { ...state, singleProduct: action.payload, isloading: false };
  }
  return state;
};

export default products_reducer;

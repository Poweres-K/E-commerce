import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
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

const ProductsContext = React.createContext();
const initialState = {
  isSideBarOpen: false,
  isloading: false,
  featuredProducts: [],
  products: [],
  isError: false,
  singleProduct: null,
};
export const ProductsProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(reducer, initialState);

  const openSideBar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSideBar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchSingleProduct = async (singleUrl) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios(singleUrl);
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: GET_PRODUCTS_BEGIN });
      try {
        const response = await axios(url);
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
      } catch (e) {
        console.log(e);
        dispatch({ type: GET_PRODUCTS_ERROR });
      }
    };
    fetchProduct();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...productState, openSideBar, closeSideBar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};

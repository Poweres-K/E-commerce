import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  initialProducts: [],
  showProducts: [],
  isGridView: true,
  sortType: "price-lowest",
  filter: {
    text: "",
    category: "All",
    company: "All",
    color: "All",
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [filterState, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const setDefaultPrice = (price) => {
    dispatch({
      type: UPDATE_FILTERS,
      payload: { field: "price", value: price },
    });
  };

  const handleClearFilter = (maxPrice) => {
    const defaultFilter = { ...initialState.filter, price: maxPrice };
    dispatch({ type: CLEAR_FILTERS, payload: defaultFilter });
  };

  const handleChangeSort = (e) => {
    e.preventDefault();
    dispatch({ type: UPDATE_SORT, payload: e.target.value });
  };

  const handleChangeFilter = (e) => {
    const value =
      e.target.name === "color" ? e.target.dataset.color : e.target.value;
    dispatch({
      type: UPDATE_FILTERS,
      payload: { field: e.target.name, value },
    });
  };
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
  }, [filterState.filter]);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [filterState.sortType, filterState.initialProducts]);

  return (
    <FilterContext.Provider
      value={{
        filterState,
        setGridView,
        setListView,
        handleChangeSort,
        handleChangeFilter,
        setDefaultPrice,
        handleClearFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};

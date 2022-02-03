import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      initialProducts: action.payload,
      showProducts: action.payload,
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      isGridView: false,
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      isGridView: true,
    };
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sortType: action.payload,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sortType, showProducts } = state;
    switch (sortType) {
      case "price-lowest":
        showProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-highest":
        showProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-a":
        showProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z":
        showProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
    }
    return { ...state };
  }

  if (action.type === UPDATE_FILTERS) {
    const { field, value } = action.payload;
    if (field === "shipping") {
      return {
        ...state,
        filter: { ...state.filter, shipping: !state.filter.shipping },
      };
    }
    return { ...state, filter: { ...state.filter, [field]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { filter, initialProducts } = state;
    const { text, category, company, color, price, shipping } = filter;
    let products = initialProducts;
    if (text) {
      products = products.filter((product) => product.name.startsWith(text));
    }

    if (category !== "All") {
      products = products.filter((product) => product.category === category);
    }

    if (company !== "All") {
      products = products.filter((product) => product.company === company);
    }

    if (color !== "All") {
      products = products.filter((product) => product.colors.includes(color));
    }

    if (shipping) {
      products = products.filter((product) => product?.shipping);
    }

    products = products.filter((product) => product.price <= price);
    return { ...state, showProducts: products };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filter: action.payload,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;

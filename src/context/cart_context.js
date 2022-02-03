import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  }
  return [];
};

const initialState = {
  cartItem: getLocalStorage(),
  totalItem: 0,
  totalAmount: 0,
  shippingFee: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, initialState);

  const handleChangeAmount = (id, newAmount) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, newAmount } });
  };

  const hangleAddtoCart = (productdetail, amount, color) => {
    const id = productdetail.id + color;
    dispatch({
      type: ADD_TO_CART,
      payload: { ...productdetail, amount, color, id },
    });
  };

  const handleRemoveItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  const handleClearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const subscribedCart = JSON.stringify(cartState.cartItem);

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(cartState.cartItem));
    // eslint-disable-next-line
  }, [subscribedCart]);

  return (
    <CartContext.Provider
      value={{
        cartState,
        hangleAddtoCart,
        handleChangeAmount,
        handleRemoveItem,
        handleClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};

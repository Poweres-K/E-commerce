import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const existingItem = state.cartItem.find(
      (product) => product.id === action.payload.id
    );
    if (existingItem) {
      const newAmount =
        existingItem.amount + action.payload.amount > existingItem.stock
          ? existingItem.stock
          : existingItem.amount + action.payload.amount;

      existingItem.amount = newAmount;
      return { ...state };
    }
    return { ...state, cartItem: [...state.cartItem, action.payload] };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const product = state.cartItem.find(
      (product) => product.id === action.payload.id
    );
    product.amount = action.payload.newAmount;
    return { ...state };
  }

  if (action.type === REMOVE_CART_ITEM) {
    const cartItem = state.cartItem.filter(
      (product) => product.id !== action.payload
    );

    return { ...state, cartItem };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cartItem: [] };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const totalItem = state.cartItem.reduce((accumulator, product) => {
      return accumulator + product.amount;
    }, 0);
    const totalAmount = state.cartItem.reduce((accumulator, product) => {
      return accumulator + product.amount * product.price;
    }, 0);
    return { ...state, totalItem, totalAmount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;

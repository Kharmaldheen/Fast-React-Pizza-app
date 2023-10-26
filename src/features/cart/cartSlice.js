import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "Mediterranean",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //Adding a new item to the cart--payload = new item
      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      //payload is id
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },

    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity += 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreaseItemQuantity(state, action) {
      //payload is the Id of the item we want to increased
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity -= 1;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },

    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  decreaseItemQuantity,
  increaseItemQuantity,
  clearCart,
} = cartSlice.actions;

// export const getTotalCartQuantity = (store) =>
//   store.cart.cart.reduce((acc, cur) => cur.quantity + acc, 0);

// export const getTotalPizzaPrice = (store) =>
//   store.cart.cart.reduce((acc, cur) => cur.totalPrice + acc, 0);

const selectCart = (store) => store.cart.cart;

export const getTotalCartQuantity = createSelector(selectCart, (cart) =>
  cart.reduce((acc, cur) => cur.quantity + acc, 0)
);

export const getTotalPizzaPrice = createSelector(selectCart, (cart) =>
  cart.reduce((acc, cur) => cur.totalPrice + acc, 0)
);

export const getCart = (store) => store.cart.cart;

export const getUsername = (store) => store.user.userName;

// export const getCurrentQuantityById = (id) => (state) =>
//   state.cart.card.find((item) => item.pizzaId === id)?.quantity ?? 0;

// export const getCurrentQuantityById = function (id) {
//   return function (store) {
//     return store.cart.cart.find((item) => item.id === id)?.quantity ?? 0;
//   };
// };

export function getCurrentQuantityById(id) {
  return function (store) {
    return store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
  };
}

// console.log(getTotalCartQuantity());

export default cartSlice.reducer;

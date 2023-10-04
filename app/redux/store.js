// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/features/cart/cartSlice'



// Create the Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer
  },
});

export default store;

// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice'
import productReducer from '@/app/redux/features/productpage/productpageSlice'



// Create the Redux store


const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;




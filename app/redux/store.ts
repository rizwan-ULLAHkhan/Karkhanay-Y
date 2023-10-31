// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice'
import productReducer from '@/app/redux/features/productpage/productpageSlice'
import ProductSearchReducer from './features/productsearchpage/productsearchpageSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';



const reducers = combineReducers({
  cart: cartReducer,
  product: productReducer,
  productSearch: ProductSearchReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Create the Redux store


const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;




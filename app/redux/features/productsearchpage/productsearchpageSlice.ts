// productSearchSlice.js

import { createSlice } from '@reduxjs/toolkit';


type Product = {
  category: string;
  createdAt: Date;  
  description: string;
  imageReferences: Array<{ [key: string]: any }>; // You'd replace [key: string]: any with more detailed structure if you know what's inside.
  inStock: boolean;
  isDeleted: boolean;
  is_trending: boolean;
  name: string;
  price: number;  
  quantity: number; 
  urls: string[];
  userEmail: string;
  _id: string ;
};
type NotFoundResponse = {
  message: string;
};
type ProductSearchState = {
  results: Product[] | NotFoundResponse;
  isLoading:boolean;
  error:null | string
  // ... any other state properties for this slice
};

const initialState: ProductSearchState = {
  results: [],
  isLoading: false,
  error: null
};

const productSearchSlice = createSlice({
  name: 'productSearch',
  initialState,
  reducers: {
    startSearch: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    searchSuccess: (state, action) => {
      state.results = action.payload;
      state.isLoading = false;
    },
    searchFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.error = null;
    }
  }
});

export const {
  startSearch,
  searchSuccess,
  searchFailure,
  clearResults
} = productSearchSlice.actions;

export default productSearchSlice.reducer;

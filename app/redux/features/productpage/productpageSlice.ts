// redux/productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type Product = {
  category: string;
  createdAt: string;  // or you could use Date if you prefer
  description: string;
  imageReferences: Array<{ [key: string]: any }>; // You'd replace [key: string]: any with more detailed structure if you know what's inside.
  inStock: boolean;
  isDeleted: boolean;
  is_trending: boolean;
  name: string;
  price: string;  // You might want to consider using number if your price is always a numerical value
  quantity: string; // Same comment as for price
  urls: string[];
  userEmail: string;
  _id: string;
};
export const fetchData = createAsyncThunk(
  'product/fetchData',
  async () => {
    const response = await fetch('/api/product');  // Your API endpoint here
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: { product: {} as Product, status: 'idle', error: null as string | null },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.product = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  }
});

export const { setSelectedProduct  } = productSlice.actions;

export default productSlice.reducer;

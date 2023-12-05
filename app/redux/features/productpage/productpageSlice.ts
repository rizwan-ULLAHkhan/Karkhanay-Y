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
  price: number;  // You might want to consider using number if your price is always a numerical value
  quantity: number; // Same comment as for price
  urls: string[];
  userId:string;
  userEmail: string;
  userName: string;
  userImage: string;
  _id: string;
};
export const fetchData = createAsyncThunk(
  'product/fetchData',
  async (productId:string) => {
    const response = await fetch(`/api/getproductforproductpage/${productId}`);  // Updated API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }
    const data = await response.json();
    console.log(data, "response is ok")
    return data;
  }
);


const productSlice = createSlice({
  name: 'product',
  initialState: { product: {} as Product, status: 'loading', error: null as string | null },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.product = action.payload;
      state.status = 'succeeded';
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

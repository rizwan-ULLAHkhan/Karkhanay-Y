
import { createSlice,nanoid  } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  value: [],
};

// Create a counter slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart:(state,action)=>{
        // const cart={
        //   id:nanoid(),
        //   text:action.payload,
        // }
        state.value += action.payload;
    }
  },
});


export const {addToCart}=cartSlice.actions
export default cartSlice.reducer
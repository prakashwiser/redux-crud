import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://66f0f85341537919154f06e7.mockapi.io/Redux';

// Fetch products from API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add product to API
export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
});

// Update product in API
export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
  console.log('Sending product to update:', product);  // Log the product being sent to update
  const response = await axios.put(`${API_URL}/${product.id}`, product);
  console.log('Response after update:', response.data);  // Log the updated product
  return response.data;
});

// Delete product from API
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Create slice for products
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle', // status: 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        console.log('Fetching products: pending');
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Products fetched successfully:', action.payload);
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('Fetching products failed:', action.error.message);
      })
      // Add product
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
        console.log('Adding product: pending');
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Product added successfully:', action.payload);
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('Adding product failed:', action.error.message);
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
        console.log('Updating product: pending');
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Product updated:', action.payload);

        // Find the product by id and update it in the state
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('Updating product failed:', action.error.message);
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
        console.log('Deleting product: pending');
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Product deleted:', action.payload);
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('Deleting product failed:', action.error.message);
      });
  },
});

export default productsSlice.reducer;

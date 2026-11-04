import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";
import {
  fetchProducts,
  fetchProductById,
  createProduct,
} from "./productThunks";

interface ProductState {
  items: Product[];
  selectedProduct: Product | null;

  loading: {
    fetchAll: boolean;
    fetchById: boolean;
    create: boolean;
  };

  error: {
    fetchAll: string | null;
    fetchById: string | null;
    create: string | null;
  };
}

const initialState: ProductState = {
  items: [],
  selectedProduct: null,

  loading: {
    fetchAll: false,
    fetchById: false,
    create: false,
  },

  error: {
    fetchAll: null,
    fetchById: null,
    create: null,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = {
        fetchAll: null,
        fetchById: null,
        create: null,
      };
    },

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading.fetchAll = true;
        state.error.fetchAll = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading.fetchAll = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading.fetchAll = false;
        state.error.fetchAll = action.payload ?? "Failed to fetch products";
      })

      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading.fetchById = true;
        state.error.fetchById = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading.fetchById = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading.fetchById = false;
        state.error.fetchById = action.payload ?? "Failed to fetch product";
      })

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading.create = false;

        const productExists = state.items.some(
          (product) => product.id === action.payload.id,
        );

        if (!productExists) {
          state.items.unshift(action.payload);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.payload ?? "Failed to create product";
      });
  },
});

export const { clearProductError, clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;

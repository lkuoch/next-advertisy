import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { listenerMiddleware } from "@features/common";

import { customerApi } from "@features/customer/api";
import { cartApi } from "./api";
import type { Product } from "./types";

interface State {
  slice: {
    hasLoaded: boolean;
  };
}

const cartAdapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Slice details
export const { actions, name, reducer } = createSlice({
  name: "cart",
  initialState: cartAdapter.getInitialState<State>({
    slice: {
      hasLoaded: false,
    },
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(cartApi.endpoints.fetchProducts.matchFulfilled, (state, { payload }) => {
      cartAdapter.addMany(state, payload);
      state.slice.hasLoaded = true;
    });
  },
});

listenerMiddleware.addListener(
  customerApi.endpoints.fetchCustomers.matchFulfilled,
  async (_, { dispatch }: { dispatch: AppDispatch }) => {
    dispatch(cartApi.endpoints.fetchProducts.initiate());
  }
);

export const selectors = (() => {
  const adapterSelectors = cartAdapter.getSelectors(({ cart }: RootState) => cart);
  const selectHasLoaded = ({ cart }: RootState) => cart.slice.hasLoaded;

  return {
    adapter: {
      ...adapterSelectors,
    },
    selectHasLoaded,
  };
})();

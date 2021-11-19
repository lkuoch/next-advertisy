import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import listenerMiddleware from "@app/store/listenerMiddleware";

import { customerApi } from "../customer/api";
import { cartApi } from "./api";
import type { Product } from "./types";

interface State {
  slice: {
    hasLoaded: boolean;
  };
}

const entity = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Slice details
const { actions, name, reducer } = createSlice({
  name: "cart",
  initialState: entity.getInitialState<State>({
    slice: {
      hasLoaded: false,
    },
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(cartApi.endpoints.fetchProducts.matchFulfilled, (state, { payload }) => {
      entity.addMany(state, payload);
      state.slice.hasLoaded = true;
    });
  },
});

const selectors = (() => {
  const entitySelectors = entity.getSelectors(({ cart }: RootState) => cart);
  const selectHasLoaded = ({ cart }: RootState) => cart.slice.hasLoaded;

  return {
    entity: {
      ...entitySelectors,
    },
    selectHasLoaded,
  } as const;
})();

listenerMiddleware.addListener({
  matcher: customerApi.endpoints.fetchCustomers.matchFulfilled,
  listener: (_, { dispatch }) => {
    dispatch(cartApi.endpoints.fetchProducts.initiate());
  },
});

export { actions, name, reducer, selectors };

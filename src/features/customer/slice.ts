import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import setWith from "lodash/setWith";
import getConfig from "next/config";

import { customerApi } from "./api";
import { Customer, CustomerSelection, OfferType } from "./types";

interface State {
  slice: {
    currentCustomerId: string;
    hasLoaded: boolean;
    selections: CustomerSelection;
  };
}

const { publicRuntimeConfig } = getConfig();

const customerAdapter = createEntityAdapter<Customer>({
  selectId: (customer) => customer.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Slice details
const { actions, name, reducer } = createSlice({
  name: "customer",
  initialState: customerAdapter.getInitialState<State>({
    slice: {
      currentCustomerId: "",
      hasLoaded: false,
      selections: {},
    },
  }),
  reducers: {
    addToCart: (state, { payload: { productId, qty } }: PayloadAction<{ productId: string; qty: number }>) => {
      if (state.slice.currentCustomerId) {
        setWith(state, ["slice", "selections", state.slice.currentCustomerId, productId, "qty"], (qty += 1), Object);
      }
    },
    removeFromCart: (state, { payload: { productId, qty } }: PayloadAction<{ productId: string; qty: number }>) => {
      if (state.slice.currentCustomerId && qty > 0) {
        setWith(state, ["slice", "selections", state.slice.currentCustomerId, productId, "qty"], (qty -= 1), Object);
      }
    },

    updateCurrentCustomerId: (state, { payload }: PayloadAction<string>) => {
      state.slice.currentCustomerId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(customerApi.endpoints.fetchCustomers.matchFulfilled, (state, { payload }) => {
      customerAdapter.addMany(state, payload);

      state.slice.currentCustomerId = payload.find(Boolean)?.id ?? "";
      state.slice.hasLoaded = true;
    });
  },
});

const selectors = (() => {
  const adapterSelectors = customerAdapter.getSelectors(({ customer }: RootState) => customer);

  const selectCurrentCustomerId = ({ customer }: RootState) => customer.slice.currentCustomerId;
  const selectSelections = ({ customer }: RootState) => customer.slice.selections;
  const selectHasLoaded = ({ customer }: RootState) => customer.slice.hasLoaded;

  const selectCurrentCustomer = createSelector(
    [(state) => adapterSelectors.selectById(state, selectCurrentCustomerId(state))],
    (customer) => customer,
    publicRuntimeConfig.vars.selector_options
  );

  const selectCurrentCustomerSelections = createSelector(
    [selectSelections, selectCurrentCustomerId],
    (selections, currentCustomerId) => selections?.[currentCustomerId],
    publicRuntimeConfig.vars.selector_options
  );

  const selectCurrentCustomerProductOffers = createSelector(
    [selectCurrentCustomer, (_, productId: string) => productId],
    (customer, productId) => customer?.offers?.[productId] ?? [],
    publicRuntimeConfig.vars.selector_options
  );

  const selectCurrentProductQuantity = createSelector(
    [selectCurrentCustomerSelections, (_, productId: string) => productId],
    (selections, productId) => selections?.[productId]?.qty ?? 0,
    publicRuntimeConfig.vars.selector_options
  );

  const selectOfferType = createSelector(
    [
      selectCurrentCustomer,
      (_, { offerType, productId }: { offerType: OfferType; productId: string }) => ({ offerType, productId }),
    ],
    (customer, { offerType, productId }) =>
      customer?.offers?.[productId]?.find(({ type }) => type === offerType)?.values,
    publicRuntimeConfig.vars.selector_options
  );

  return {
    adapter: {
      ...adapterSelectors,
    },
    selectCurrentCustomerId,
    selectHasLoaded,
    selectCurrentCustomerProductOffers,
    selectCurrentProductQuantity,
    selectOfferType,
  };
})();

export { actions, name, reducer, selectors };

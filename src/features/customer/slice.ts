import { createEntityAdapter, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@utils";
import setWith from "lodash/setWith";

import { customerApi } from "./api";
import { Customer, CustomerSelection, OfferType } from "./types";

interface State {
  slice: {
    currentCustomerId: string;
    hasLoaded: boolean;
    selections: CustomerSelection;
  };
}

const entity = createEntityAdapter<Customer>({
  selectId: (customer) => customer.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

// Slice details
const { actions, name, reducer } = createSlice({
  name: "customer",
  initialState: entity.getInitialState<State>({
    slice: {
      currentCustomerId: "",
      hasLoaded: false,
      selections: {},
    },
  }),
  reducers: {
    addToCart: (state, { payload: { id, qty } }: PayloadAction<{ id: string; qty: number }>) => {
      if (state.slice.currentCustomerId) {
        setWith(state, ["slice", "selections", state.slice.currentCustomerId, id, "qty"], (qty += 1), Object);
      }
    },
    removeFromCart: (state, { payload: { id, qty } }: PayloadAction<{ id: string; qty: number }>) => {
      if (state.slice.currentCustomerId && qty > 0) {
        setWith(state, ["slice", "selections", state.slice.currentCustomerId, id, "qty"], (qty -= 1), Object);
      }
    },

    updateCurrentCustomer: (state, { payload }: PayloadAction<string>) => {
      state.slice.currentCustomerId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(customerApi.endpoints.fetchCustomers.matchFulfilled, (state, { payload }) => {
      entity.addMany(state, payload);

      state.slice.currentCustomerId = payload.find(Boolean)?.id ?? "";
      state.slice.hasLoaded = true;
    });
  },
});

const selectors = (() => {
  const entitySelectors = entity.getSelectors(({ customer }: RootState) => customer);

  const selectCurrentCustomerId = ({ customer }: RootState) => customer.slice.currentCustomerId;
  const selectCustomerSelections = ({ customer }: RootState) => customer.slice.selections;
  const selectHasLoaded = ({ customer }: RootState) => customer.slice.hasLoaded;

  const selectCurrentCustomer = createSelector(
    [(state) => entitySelectors.selectById(state, selectCurrentCustomerId(state))],
    (customer) => customer
  );

  const selectCurrentCustomerSelections = createSelector(
    [(state) => ({ selections: selectCustomerSelections(state), currentCustomerId: selectCurrentCustomerId(state) })],
    ({ currentCustomerId, selections }) => selections?.[currentCustomerId]
  );

  const selectCurrentCustomerProductOffers = createSelector(
    [(state, id: string) => ({ customer: selectCurrentCustomer(state), id })],
    ({ customer, id }) => customer?.offers?.[id] ?? []
  );

  const selectCurrentProductQuantity = createSelector(
    [(state) => selectCurrentCustomerSelections(state), (_, id: string) => id],
    (selections, id) => selections?.[id]?.qty ?? 0
  );

  const selectOfferType = createSelector(
    [
      (state) => selectCurrentCustomer(state),
      (_, { offerType, id }: { offerType: OfferType; id: string }) => ({ offerType, id }),
    ],
    (customer, { offerType, id }) => customer?.offers?.[id]?.find(({ type }) => type === offerType)?.values
  );

  return {
    entity: {
      ...entitySelectors,
    },
    selectCurrentCustomerId,
    selectCurrentCustomer,
    selectHasLoaded,
    selectCurrentCustomerProductOffers,
    selectCurrentProductQuantity,
    selectOfferType,
  };
})();

export { actions, name, reducer, selectors };

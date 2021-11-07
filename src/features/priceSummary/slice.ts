import { createSelector, createSlice } from "@reduxjs/toolkit";
import getConfig from "next/config";

import { selectors as customerSelectors } from "../customer/slice";
import { selectors as cartSelectors } from "../cart/slice";

import { calculateDiscountSavings, calculateFinalPrice } from "./services";

const { publicRuntimeConfig } = getConfig();

// Slice details
const { actions, name, reducer } = createSlice({
  name: "priceSummary",
  initialState: {},
  reducers: {},
});

const selectors = (() => {
  const selectBasePrice = createSelector(
    [cartSelectors.adapter.selectAll, (state) => state],
    (products, state) =>
      products.reduce(
        (subTotal, { id, retailPrice: price }) =>
          (subTotal += customerSelectors.selectCurrentProductQuantity(state, id) * price),
        0
      ),
    publicRuntimeConfig.vars.selector_options
  );

  const selectDiscountedSavings = createSelector(
    [(state) => cartSelectors.adapter.selectAll(state), (state) => state],
    (products, state) =>
      products
        .map(({ id, retailPrice: price }) => ({
          price,
          qty: customerSelectors.selectCurrentProductQuantity(state, id),
          offers: customerSelectors.selectCurrentCustomerProductOffers(state, id),
        }))
        .reduce(
          (discountSavingsTotal, { price, qty, offers }) =>
            (discountSavingsTotal += offers.reduce(
              (offerSavingsTotal, offer) => (offerSavingsTotal += calculateDiscountSavings({ price, qty, offer })),
              0
            )),
          0
        ),
    publicRuntimeConfig.vars.selector_options
  );

  const selectFinalPrice = createSelector(
    [selectBasePrice, selectDiscountedSavings],
    (basePrice, discountPrice) => calculateFinalPrice({ basePrice, discountPrice }),
    publicRuntimeConfig.vars.selector_options
  );

  return {
    selectBasePrice,
    selectDiscountedSavings,
    selectFinalPrice,
  };
})();

export { actions, name, reducer, selectors };

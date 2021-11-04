import * as cartState from "@features/cart/state";
import * as customerState from "@features/customer/state";
import * as priceSummaryState from "@features/priceSummary/state";

const reducers = {
  [cartState.name]: cartState.reducer,
  [customerState.name]: customerState.reducer,
  [priceSummaryState.name]: priceSummaryState.reducer,
};

export default reducers;

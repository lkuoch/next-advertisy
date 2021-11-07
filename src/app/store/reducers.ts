import * as cart from "@features/cart/slice";
import * as customer from "@features/customer/slice";
import * as priceSummary from "@features/priceSummary/slice";

const reducers = {
  [cart.name]: cart.reducer,
  [customer.name]: customer.reducer,
  [priceSummary.name]: priceSummary.reducer,
};

export default reducers;

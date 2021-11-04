import React from "react";

import Customer from "@components/customer";
import Cart from "@components/cart";
import PriceSummary from "@components/priceSummary";

export const App = () => {
  return (
    <div id="app">
      <h3 className="ui block center aligned header">Advertisy</h3>

      <div id="content">
        <Customer />

        <div id="checkout">
          <Cart />
          <PriceSummary />
        </div>
      </div>
    </div>
  );
};

export default App;

import Box from "@mui/material/Box";

import Customer from "./customer";
import Cart from "./cart";
import PriceSummary from "./priceSummary";

export const App = () => {
  return (
    <div id="app">
      <h3 className="ui block center aligned header">Advertisy</h3>

      <div id="content" style={{ padding: "2rem 5rem 2rem 5rem", display: "flex", justifyContent: "space-between" }}>
        <Customer />

        <div id="checkout" style={{ flexGrow: 6, margin: "0 0 0 1rem" }}>
          <Cart />
          <PriceSummary />
        </div>
      </div>
    </div>
  );
};

export default App;

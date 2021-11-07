import React from "react";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@features/customer/slice";
import Loader from "../common/loader";
import Table from "./table";

const Cart = () => {
  const hasLoaded = useSelector(customerSelectors.selectHasLoaded);

  return (
    <div id="cart" style={{ marginBottom: "5rem" }}>
      <div className="center-panel ui segment">
        <h2 className="title ui header">
          <i className="ui store icon" />
          <div className="content">My Cart</div>
        </h2>

        {hasLoaded ? <Table /> : <Loader />}
      </div>
    </div>
  );
};

export default Cart;

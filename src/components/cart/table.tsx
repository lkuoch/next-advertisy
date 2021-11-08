import { useSelector } from "react-redux";

import { selectors } from "@features/cart/slice";

import Description from "./description";
import Price from "./price";
import UserSelection from "./userSelection";

const Table = () => {
  const products = useSelector(selectors.adapter.selectAll);
  const hasLoaded = useSelector(selectors.selectHasLoaded);

  if (!hasLoaded) {
    return (
      <div className="ui segment" style={{ height: "25vh" }}>
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      </div>
    );
  }

  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th className="two wide">Name</th>
          <th className="nine wide">Description</th>
          <th className="two wide">Retail Price</th>
          <th className="three wide">Quantity</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td data-label="name">{product.name}</td>

            <td data-label="description">
              <Description product={product} />
            </td>

            <td data-label="retail-price">
              <Price product={product} />
            </td>

            <td data-label="select-quantity">
              <UserSelection product={product} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

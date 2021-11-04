import React from "react";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@features/customer/state";
import type { Product } from "@features/cart/types";
import { OfferType } from "@features/customer/types";

interface Props {
  product: Product;
}

const Price = ({ product: { retailPrice, id } }: Props) => {
  const customerPrice = useSelector((state) =>
    customerSelectors.selectOfferType(state, { offerType: OfferType.NewPrice, productId: id })
  );

  return (
    <div className="price">
      {customerPrice == null ? (
        <div className="ui message center aligned">${retailPrice}</div>
      ) : (
        <div className="ui message teal center aligned">${customerPrice}</div>
      )}
    </div>
  );
};

export default Price;

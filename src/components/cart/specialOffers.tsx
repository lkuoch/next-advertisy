import React from "react";
import { useSelector } from "react-redux";

import { selectors as customerSelectors } from "@features/customer/slice";

import type { Product } from "@features/cart/types";
import { OfferType } from "@features/customer/types";

interface Props {
  product: Product;
}

const SpecialOffers = ({ product: { id, retailPrice } }: Props) => {
  const newPriceOffer = useSelector((state) =>
    customerSelectors.selectOfferType(state, { offerType: OfferType.NewPrice, productId: id })
  );
  const xyDealOffer = useSelector((state) =>
    customerSelectors.selectOfferType(state, { offerType: OfferType.XYDeal, productId: id })
  );

  const hasOffers = (newPriceOffer?.length ?? []) > 0 || (xyDealOffer?.length ?? []) > 0;

  return (
    <>
      {hasOffers && (
        <div className="special-offer-section">
          <p>
            <span className="special-offer-title ui red text">SPECIAL OFFER:</span>
          </p>

          <ul>
            {newPriceOffer && (
              <li>
                <span className="special-offer ui blue text">{`We have slashed the price from ${retailPrice} -> ${newPriceOffer[0]}`}</span>
              </li>
            )}

            {xyDealOffer && (
              <li>
                <span className="special-offer ui blue text">{`Buy ${xyDealOffer[0]} for the price of ${xyDealOffer[1]}`}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default SpecialOffers;

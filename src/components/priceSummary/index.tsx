import { useSelector } from "react-redux";

import { selectors } from "@features/priceSummary/slice";

const PriceSummary = () => {
  const basePrice = useSelector(selectors.selectBasePrice);
  const discountPrice = useSelector(selectors.selectDiscountedSavings);
  const finalPrice = useSelector(selectors.selectFinalPrice);

  return (
    <div id="price-summary" style={{ display: "flex", justifyContent: "flex-end" }}>
      <div className="price-summary-wrapper ui clearing segment" style={{ width: "50%" }}>
        <h3 className="ui dividing header right aligned">Item Totals</h3>

        <h4 id="total-price" className="ui header right aligned" style={{ margin: 0 }}>
          ${basePrice.toFixed(2)}
        </h4>

        {discountPrice > 0 && (
          <>
            <h3 className="ui dividing header right aligned red">Your Savings</h3>
            <h4 id="discount-price" className="ui header right aligned red">
              ${discountPrice.toFixed(2)}
            </h4>

            <h2 className="ui dividing header right aligned">Final Price</h2>
            <h3 id="discount-price" className="ui header right aligned">
              ${finalPrice.toFixed(2)}
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default PriceSummary;

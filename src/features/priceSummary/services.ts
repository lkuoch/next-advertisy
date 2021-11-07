import { Offer, OfferType } from "../customer/types";

const calculateBasePrice = ({ qty, price }: { qty: number; price: number }) => qty * price;
const calculateFinalPrice = ({ basePrice, discountPrice }: { basePrice: number; discountPrice: number }) =>
  basePrice - discountPrice;

const calculateNewPrice = ({ offer, qty }: { offer: Offer; qty: number }) => offer.values[0] * qty;

const calculateXYDeal = ({ offer, qty, price }: { offer: Offer; qty: number; price: number }) => {
  const [x, y] = offer.values;

  // Normal price
  if (qty < x) {
    return price * qty;
  }

  const quotient = Math.floor(qty / x);
  const remainder = qty % x;

  return quotient * y * price + remainder * price;
};

const calculateDiscountSavings = ({ qty, price, offer }: { qty: number; price: number; offer: Offer }) =>
  ({
    [OfferType.NewPrice]: calculateBasePrice({ qty, price }) - calculateNewPrice({ qty, offer }),
    [OfferType.XYDeal]: calculateBasePrice({ qty, price }) - calculateXYDeal({ qty, price, offer }),
  }[offer.type]);

export { calculateDiscountSavings, calculateFinalPrice };

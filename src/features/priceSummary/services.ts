import { Offer, OfferType } from "../customer/types";

interface Pricing {
  readonly qty: number;
  readonly price: number;
  readonly basePrice: number;
  readonly discountPrice: number;
  readonly offer: Offer;
}

const calculateBasePrice = (pricing: Pick<Pricing, "price" | "qty">) => pricing.price * pricing.qty;
const calculateNewPrice = (pricing: Pick<Pricing, "offer" | "qty">) => pricing.offer.values[0] * pricing.qty;

const calculateXYDeal = (pricing: Pick<Pricing, "offer" | "qty" | "price">) => {
  const { offer, qty, price } = pricing;
  const [x, y] = offer.values;

  // Normal price
  if (qty < x) {
    return price * qty;
  }

  const quotient = Math.floor(qty / x);
  const remainder = qty % x;

  return quotient * y * price + remainder * price;
};

export const calculateDiscountSavings = ({ qty, price, offer }: Pick<Pricing, "offer" | "qty" | "price">) =>
  ({
    [OfferType.NewPrice]: calculateBasePrice({ qty, price }) - calculateNewPrice({ qty, offer }),
    [OfferType.XYDeal]: calculateBasePrice({ qty, price }) - calculateXYDeal({ qty, price, offer }),
  }[offer.type]);

export const calculateFinalPrice = (pricing: Pick<Pricing, "basePrice" | "discountPrice">) =>
  pricing.basePrice - pricing.discountPrice;

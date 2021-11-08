import SpecialOffers from "./specialOffers";
import type { Product } from "@features/cart/types";

interface Props {
  product: Product;
}

const Description = ({ product }: Props) => {
  return (
    <div className="description">
      <p>{product.description}</p>
      <SpecialOffers product={product} />
    </div>
  );
};

export default Description;

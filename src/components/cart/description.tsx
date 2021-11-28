import SpecialOffers from "./specialOffers";

import Typography from "@mui/material/Typography";

import type { Product } from "@features/cart/types";

interface Props {
  product: Product;
}

const Description = ({ product }: Props) => {
  return (
    <>
      <Typography variant="subtitle1" component="p">
        {product.description}
      </Typography>

      <SpecialOffers product={product} />
    </>
  );
};

export default Description;

import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { selectors as customerSelectors } from "@features/customer/slice";
import { OfferType } from "@features/customer/types";
import type { Product } from "@features/cart/types";

interface Props {
  product: Product;
}

const Price = ({ product: { retailPrice, id } }: Props) => {
  const theme = useTheme();

  const customerPrice = useSelector((state) =>
    customerSelectors.selectOfferType(state, { offerType: OfferType.NewPrice, id })
  );

  return (
    <Typography variant="subtitle1" component="p" {...(customerPrice && { color: theme.palette.primary.main })}>
      {customerPrice ?? retailPrice}
    </Typography>
  );
};

export default Price;

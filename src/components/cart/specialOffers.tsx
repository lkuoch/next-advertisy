import { useSelector } from "react-redux";

import { red, teal } from "@mui/material/colors";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

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
        <List>
          <ListItem sx={{ color: red[500] }}>
            <ListItemIcon>
              <LocalOfferIcon />
            </ListItemIcon>
            <ListItemText primary="SPECIAL OFFER:" />
          </ListItem>

          {newPriceOffer && (
            <ListItem sx={{ color: teal[500], pl: 4 }}>
              <ListItemText primary={`We have slashed the price from ${retailPrice} -> ${newPriceOffer[0]}`} />
            </ListItem>
          )}

          {xyDealOffer && (
            <ListItem sx={{ color: teal[500], pl: 4 }}>
              <ListItemText
                primary={`Buy ${xyDealOffer[0]} for the price of ${xyDealOffer[1]}`}
                sx={{ color: teal[500] }}
              />
            </ListItem>
          )}
        </List>
      )}
    </>
  );
};

export default SpecialOffers;

import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import Stack from "@mui/material/Stack";

import { actions as customerActions, selectors as customerSelectors } from "@features/customer/slice";

import type { Product } from "@features/cart/types";
import { Typography } from "@mui/material";

interface Props {
  product: Product;
}

const UserSelection = ({ product: { id } }: Props) => {
  const dispatch = useDispatch();
  const qty = useSelector((state) => customerSelectors.selectCurrentProductQuantity(state, id));

  return (
    <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
      <Typography variant="subtitle1" component="div">
        {qty}
      </Typography>

      <Button
        onClick={() => dispatch(customerActions.addToCart({ id, qty }))}
        startIcon={<AddIcon />}
        variant="contained"
      >
        ADD
      </Button>

      <Button
        color="primary"
        onClick={() => dispatch(customerActions.removeFromCart({ id, qty }))}
        startIcon={<RemoveIcon />}
        variant="outlined"
      >
        REMOVE
      </Button>
    </Stack>
  );
};

export default UserSelection;

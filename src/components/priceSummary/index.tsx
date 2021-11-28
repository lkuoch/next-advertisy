import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { selectors } from "@features/priceSummary/slice";

import { Heading } from "@components/common";

const PriceSummary = () => {
  const theme = useTheme();
  const basePrice = useSelector(selectors.selectBasePrice);
  const discountPrice = useSelector(selectors.selectDiscountedSavings);
  const finalPrice = useSelector(selectors.selectFinalPrice);

  return (
    <Box sx={{ display: "flex", alignContent: "flex-end", justifyContent: "flex-end" }}>
      <List>
        <ListItem>
          <Heading text="Item totals" />
        </ListItem>

        <ListItem>
          <Typography variant="h6" component="div">
            ${basePrice.toFixed(2)}
          </Typography>
        </ListItem>

        {discountPrice > 0 && (
          <>
            <ListItem>
              <Heading text="Your Savings" />
            </ListItem>

            <ListItem>
              <Typography variant="h6" component="div" sx={{ color: theme.palette.error.main }}>
                ${discountPrice.toFixed(2)}
              </Typography>
            </ListItem>

            <ListItem>
              <Heading text="Final Price" />
            </ListItem>

            <ListItem>
              <Typography variant="h6" component="div" sx={{ color: theme.palette.success.main }}>
                ${finalPrice.toFixed(2)}
              </Typography>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
};

export default PriceSummary;

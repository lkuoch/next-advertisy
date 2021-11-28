import { useDispatch, useSelector } from "react-redux";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import { actions, selectors } from "@features/customer/slice";
import { customerApi } from "@features/customer/api";

import { Heading, Loader } from "@components/common";

const Customer = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = customerApi.useFetchCustomersQuery();

  const entities = useSelector(selectors.entity.selectAll);
  const currentCustomer = useSelector(selectors.selectCurrentCustomer);

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", cursor: "pointer" }}
      subheader={<Heading text="Customers" />}
    >
      {isLoading && <Loader />}

      {isSuccess &&
        entities.map(({ id, name }) => (
          <ListItem
            key={id}
            selected={id === currentCustomer?.id}
            onClick={() => (id !== currentCustomer?.id ? dispatch(actions.updateCurrentCustomer(id)) : null)}
          >
            <ListItemAvatar></ListItemAvatar>
            <ListItemText primary={name} />
          </ListItem>
        ))}
    </List>
  );
};

export default Customer;

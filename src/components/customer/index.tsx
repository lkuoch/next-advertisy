import { useDispatch, useSelector } from "react-redux";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListSubheader from "@mui/material/ListSubheader";

import { actions, selectors } from "@features/customer/slice";
import { customerApi } from "@features/customer/api";

import Loader from "../common/Loader";

const Customer = () => {
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess } = customerApi.useFetchCustomersQuery();

  const entities = useSelector(selectors.adapter.selectAll);
  const currentCustomer = useSelector(selectors.selectCurrentCustomer);

  return (
    <div id="customers" style={{ flexGrow: 1, margin: "0 1rem 0 0" }}>
      {isError && <h1>ERROR</h1>}
      {isLoading && <Loader />}

      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", cursor: "pointer" }}
        subheader={<ListSubheader component="div">Customers</ListSubheader>}
      >
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
    </div>
  );
};

export default Customer;

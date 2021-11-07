import { useDispatch, useSelector } from "react-redux";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListSubheader from "@mui/material/ListSubheader";

import { actions, selectors } from "@features/customer/slice";
import { customerApi } from "@features/customer/api";

import Loader from "../common/loader";

const Customer = () => {
  const dispatch = useDispatch();
  const { isError, isLoading, isSuccess } = customerApi.useFetchCustomersQuery();

  const entities = useSelector(selectors.adapter.selectAll);
  const currentCustomerId = useSelector(selectors.selectCurrentCustomerId);

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
              selected={id === currentCustomerId}
              onClick={() => (id !== currentCustomerId ? dispatch(actions.updateCurrentCustomerId(id)) : null)}
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

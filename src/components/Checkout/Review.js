import React, { useContext } from "react";

import CartContext from "../../store/cart-context";

import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

function Review(props) {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cartCtx.items.map((item) => (
          <ListItem style={{ padding: "10px 0" }} key={item.name}>
              <ListItemText primary={item.name} secondary={`Quantity: ${item.amount}`}/>
              <Typography variant='body2'>{`$${(item.price*item.amount).toFixed(2)}`}</Typography>
          </ListItem>
        ))}
        <hr/>
        <ListItem style={{ padding: "10px 0" }}>
            <ListItemText primary='total'/>
            <Typography variant='subtitle1' style={{fontWeight:700}}>{totalAmount}</Typography>
        </ListItem>
      </List>
    </>
  );
}

export default Review;

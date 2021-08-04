import { useContext } from 'react';
import { useHistory } from 'react-router';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from '../Cart/Cart.module.css'
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const history = useHistory()

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  if(totalAmount.charAt(2) == '-'){
    totalAmount = '$0.00'
  }
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    const newItem = {
      name:item.name,
      amount:1,
      id:item.id,
      price:item.price
    }
    cartCtx.addItem(newItem);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderClicked = ()=>{
    history.push('/checkout')
  }

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderClicked}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;

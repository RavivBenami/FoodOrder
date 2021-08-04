import { useState } from 'react';
import {Switch,BrowserRouter,Route,Link} from 'react-router-dom'

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import CheckoutComp from './components/Checkout/CheckoutComp';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <BrowserRouter>
    <CartProvider>
    <Switch>
    <Route exact path="/">
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Route>
    <Route path="/checkout" component={CheckoutComp}/>
    </Switch>
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;

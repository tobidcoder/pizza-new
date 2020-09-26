import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './componenet/pages/Home';
import Cart from './componenet/pages/Carts';
import Orders from './componenet/pages/Orders';
import LoginReg from './componenet/pages/LoginRegister';


function App() {
  return (
    <div>
     
      <BrowserRouter>
     
      <Switch>
        
        <Route exact path="/"  component={ Home }/>
        <Route path="/carts" component={ Cart } />
        <Route path="/orders" component={ Orders } />
        <Route path="/auth" component={ LoginReg } />
      </Switch>
    </BrowserRouter>
    </div>
  );
}
      {/* <Carosel /> */}
      {/* <CartItem />
      // <CartItemsList /> */}
      {/* <NewCart /> */}
      {/* <ProductHomeWeb /> */}
     
      {/* <ProductHomeMobile /> */}

export default App;

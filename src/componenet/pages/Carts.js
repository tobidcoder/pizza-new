import React, {useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import CartItemList from '../CartItemList';
import { Button, Grid, TextField } from '@material-ui/core';
import NewNav from '../NewNav';
import { CartContext } from '../../contexts/CartContext';
import { formatDollar, formartEuros } from '../../helpers/utils';
import { changeCurrency, useGlobalState } from '../../services/GlobalState';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { TokenService, SetUser } from '../../services/storage.service';
import Config from '../../services/api.config';
import { useAlert } from 'react-alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';



export default function Carts() {
  const history = useHistory();
  const {  control, register, handleSubmit, watch, errors } = useForm();
  
  const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);
  const [value, setValue] = useGlobalState('currency');
  let shippingFees = 5.00;
  const [loading, setLoading] = React.useState(false)
  function showMe(){
    alert.success('Great, Order places successful!');
  }

  const alert = useAlert()
 

  const onSubmit = data => {
    setLoading(true);
    axios.post(`${Config.baseUrl}/add-to-cart`, {
      data,
      cartItems,
      total,
      itemCount,
    }, Headers)
      .then((response) => {
        clearCart()
            SetUser.saveUser(response.data.data);
            TokenService.saveUserEmail(response.data.data.email)
          history.push("/orders");
          window.location.reload(false)
          alert.success('Great, Order places successful!');

      }, (error) => {
        console.log(error);
        alert.error('Oh Oh, Something went wrong!');
        
      })
      .finally(function () {
        setLoading(false);
      })
  };
 function shippingForm(){
   return(
    <form onSubmit={handleSubmit(onSubmit)}>
    <Typography style={{textAlign: 'right', fontSize: 15, marginTop: 15}} component="h4" variant="h6">
      <b>Total Cart: </b> {' '} {!value ? formatDollar(total) :
      formartEuros(total * 0.84) }
      <br></br>
      <b>Shipping Fee:</b> {' '} {!value ? formatDollar(5.00)  :  formartEuros(5.00 * 0.84)}
      <br></br>
      {/* <b>Total:</b> {' '} {!value ? '$'+total1+5.00:    '€'+(total + 5.00) * 0.84} */}
    </Typography>

    <Typography component="h4" variant="h5">
      Shipping Information
    </Typography>

    <input type="text" name="currency" value={!value ? '$' : '€'} ref={register({ required: true })} hidden></input>
    <input type="text" name="shippingFees" defaultValue={shippingFees} ref={register({ required: true })} hidden></input>
    
    <Grid container>
      <Grid item xs={6} md={12} style={{padding: 2}}>
        <div>
      <Controller
        as={TextField}
        id="standard-basic" 
        label="Name"
        type="text"
        defaultValue=""
        control={control}
        name="full_name" 
        inputRef={register({ required: true})}
       />
       </div>
      <Controller
        as={TextField}
        id="standard-basic" 
        label="Phone" 
        type="number"
        control={control}
        name="phone" 
        type="number"
        defaultValue=""
        inputRef={register({ required: true})}
        />
      <Controller
        as={TextField} 
        id="standard-basic" 
        label="Zip Code" type="number"
        control={control}
        type="number"
        defaultValue=""
        value=""
        name="zip_code" 
        inputRef={register({ required: true })}  
        />
      </Grid>
      <Grid item xs={6} md={12} style={{padding: 2}}>
      <Controller
        as={TextField} 
        id="standard-basic" 
        label="Email" 
        type="email" 
        control={control}
        defaultValue=""
        name="email" 
        inputRef={register({
          required: "Enter your e-mail",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Enter a valid e-mail address",
          },
        })}
        />         
      <Controller
        as={TextField}
        id="standard-textarea"
        label="Delivery Address"
        multiline
        type="text"
        control={control}
        defaultValue=""
        name="address" inputRef={register({ required: true })}  
       />
      {errors.full_name && <p style={{color: 'red'}}>Name field is required</p>}
      {errors.address && <p style={{ color: 'red' }}>Delivery Address field is required</p>}
      {errors.phone && <p style={{color: 'red'}}>Phone Number field is required</p>}
      {errors.zip_code && <p style={{color: 'red'}}>Zip Code field is required</p>}
      {errors.email && <p style={{color: 'red'}}>Email field is required</p>}
      </Grid>
    </Grid>

    <div style={{marginTop: 25, textAlign: 'right'}}>
    <Button variant="contained" onClick={() => clearCart() } style={{margin: 15}} color="secondary">
      Clear Cart
    </Button>
    <Button variant="contained" onClick={() => history.push('/') } style={{margin: 15}} color="secondary">
      Menu
    </Button>
    
     {!loading ? 
     <Button type="submit" variant="contained" color="secondary">Place Order</Button>
      : (
        <Button variant="contained" color="secondary" disabled>
       <CircularProgress color="secondary"></CircularProgress>Loading...
       </Button> 
       )
     } 
    
    </div>
    </form>
   )
 }
  console.log(cartItems)
  return (
    <React.Fragment>
      <NewNav />
      <CssBaseline />
      <Container maxWidth="sm">
      <Typography component="h6" variant="h4" style={{textAlign: 'center', paddingTop: 105}}>
            My Orders
        </Typography>
        {cartItems.length > 0 ?
            cartItems.map(product =>  <CartItemList key={product.id} product={product}/>)
        : 
         <Typography variant="h5" style={{textAlign: 'center'}}>
          <RemoveShoppingCartIcon  style={{textAlign: 'center', fontSize: 120, color: "#F50057"}}/>
          <p color="secondary" onClick={()=> history.push('/')} style={{textAlign: 'center', fontSize: 16, color: "#F50057", cursor:"pointer"}}>Click Here to Start Shopping!</p>
         </Typography>
        }
         {cartItems.length > 0 ? (shippingForm()) :
         null}
      </Container>
    </React.Fragment>
  );
}

import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Grid, Button }  from '@material-ui/core';
import Carousel from '../Carousel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ProductHomeweb from '../ProductHomeWeb';
import ProductHomeMobile from '../ProductHomeMobile';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import NewNav from '../NewNav';
import { ProductsContext } from '../../contexts/ProductsContext';
import { CartContext } from '../../contexts/CartContext';
import { formatDollar, formartEuros } from '../../helpers/utils';
import { changeCurrency, useGlobalState } from '../../services/GlobalState';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    position: 'fixed',
  },
  currency:{
    fontSize: 40,
    fontWeight: 500,
},
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const [showMobile, setShowMobile]  = useState(false);
  const { products} = useContext(ProductsContext)
  const { total, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);
  const { increase, decrease, removeProduct, addProduct, cartItems} = useContext(CartContext);
console.log(products);
  useEffect(() => {
    if(window.innerWidth <= 600){
      setShowMobile(true)
    }
    window.addEventListener('resize', ()=>{
        if(window.innerWidth <= 650){
          setShowMobile(true);
        }else{
          setShowMobile(false);
        }
    })
  
}, [])
  return (
      
    <React.Fragment>
        <NewNav />
          <Carousel />
    {/* <CssBaseline /> */}
    <Container maxWidth="lg">
      
    <div className={classes.root}>
   
        <div style={{textAlign: "center", margin: 30}}>
        <Button variant="contained"  onClick={() => history.push("/carts") } color="secondary">
          Go To Cart
        </Button>
        </div>

        {!showMobile ? (
      <Grid container spacing={0}>
          {/* <ProductHomeweb /> */}
          {
              products.map(product => (
                <Grid item xs={3}>
                  <ProductHomeweb key={product.id} product={product} />
                </Grid>
              ))
          }        
      </Grid>
        ) : ''}
    </div>
   

    {/* Mobile view */}
    <div>
      {showMobile? (
    <Grid container spacing={0}>

        {
          products.map(product => (
            <Grid item xs={12}>
              <ProductHomeMobile key={product.id} product={product} />
            </Grid>
          ))
        }    
      
      </Grid>
      ) : ''}
      <Fab color="secondary" aria-label="edit" className={classes.fab}>
      <Badge badgeContent={itemCount} color="secondary">
                <AddShoppingCartIcon 
                  onClick={() => history.push('/carts')}
                className={classes.currency} />
                
              </Badge>
      </Fab>
    </div>
    
    </Container>
    </React.Fragment>
  );
}

import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CartContext } from '../contexts/CartContext';
import { formatDollar, formartEuros } from '../helpers/utils';
import { changeCurrency, useGlobalState } from '../services/GlobalState';
import { useAlert } from 'react-alert'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 10,
   
  },
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    maxWidth: 500,
    '&:hover':{
        backgroundColor: '#fffff'
    }
  },
  image: {
    width: 120,
    height: 120,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    "&:hover": {
        padding: 2,
        backgroundColor: '#fffff0'
      }
  },
  button:{
    height: 20,
    fontSize: 10,
    width: 120,
    // marginLeft: 10,
    backgroundColor: "#F50057",
    '&:hover':{
      backgroundColor: 'black',
    }
},
button1:{ 
  marginLeft: 3,
  fontSize: 10, //ffffff
  backgroundColor: "black",
  // '&:hover':{
  //   backgroundColor: 'black',
  // }
},
description:{
    fontSize: 12,
    fontWeight: 10,
    marginTop: 0
}
}));

export default function ProductHomeMobile({product}) {

  const classes = useStyles();
  const { increase, decrease, removeProduct, addProduct, cartItems} = useContext(CartContext);
  console.log(product);
 const isInCart = product => {
     return !!cartItems.find(item => item.id === product.id);
 }

let obj = cartItems.find(o => o.id === product.id);
 
 const [value, setValue] = useGlobalState('currency');

 const alert = useAlert()

console.log(product);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>

        <Grid container spacing={1}>
        <Grid item>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" 
              src={product.photo} />
            </ButtonBase>
            </Grid>
          </Grid>
          <Grid item xs>
          <Grid item xs={10} sm container>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  <b>{product.name}</b>
                </Typography>
                <Typography className={classes.description} variant="body2" component="p" gutterBottom>
                  {product.description.slice(0, 15)}...
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <b>S:</b> {product.size} {'  '} <b>Q:</b>{product.quantity}
                </Typography>
                {!isInCart(product) && 
                 <Button variant="outlined"
                    onClick={() => { addProduct(product); alert.success('Great, '+product.name+' add  to cart');}} 
                    // onClick={() => { func1(); func2();}}
                    className={classes.button} 
                    style={{color: "#ffffff"}}
                    >
                       Add to Cart
                   </Button>  
                  }

                  {
                    isInCart(product) &&
                    <Button variant="outlined"
                    className={classes.button1} 
                    style={{color: "#ffffff"}}
                    >
                      Already in Cart
                    </Button>
                  }
              </Grid>
            </Grid>
            <Grid item xs={2} >
              <Typography variant="subtitle1" color="secondary"
               style={{color: '#F50057',}}>
                { value ?
                  formartEuros(product.price * 0.84)
                :
                  formatDollar(product.price)
                }
                </Typography>
            </Grid>
          </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

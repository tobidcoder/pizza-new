import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CartContext } from '../contexts/CartContext';
import { formatDollar, formartEuros } from '../helpers/utils';
import { changeCurrency, useGlobalState } from '../services/GlobalState';
import { useAlert } from 'react-alert'



const useStyles = makeStyles({
  root: {
    maxWidth: 370,
    textAlign: 'left',
    margin: 15,
    padding: 1,
  },
  button:{ 
    marginLeft: 50,
    fontSize: 10,
    backgroundColor: "#F50057",
    '&:hover':{
      backgroundColor: 'black',
    }
  },
    button1:{ 
      marginLeft: 30,
      fontSize: 10, //ffffff
      backgroundColor: "black",
      '&:hover':{
        backgroundColor: 'black',
      }
    },

  img:{
     padding: 9,
    // margin: 10,
      // '&:hover':{
      //     // margin: 2,
      //     padding: 2,
      // }
  }
});


export default function ProductHomeWeb({product}) {

  const classes = useStyles();
  const { increase, decrease, removeProduct, addProduct, cartItems} = useContext(CartContext);
   console.log(product);
  const isInCart = product => {
      return !!cartItems.find(item => item.id === product.id);
  }
 
let obj = cartItems.find(o => o.id === product.id);
 
  const [value, setValue] = useGlobalState('currency');
  const alert = useAlert()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="280"
          image={product.photo}
          title="Contemplative Reptile"
          className={classes.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description.slice(0, 30)}...
          </Typography>
          <Typography gutterBottom className={classes.SizeQua} variant="body2" component="h6">
             <b>Size:</b> {product.size}
            <span style={{marginLeft: 60}}> {'   '}<b>Quantity:</b> {product.quantity}</span>
          </Typography>
          <hr></hr>
          <Typography gutterBottom variant="body2" component="h2" style={{color: '#F50057',}}>
            Price: {value ?
                formartEuros(product.price * 0.84)
                :
                formatDollar(product.price)
              }
            
                 {!isInCart(product) && 
                 <Button variant="outlined"
                 onClick={() => { addProduct(product); alert.success('Great, '+product.name+' add  to cart');}} 
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
            
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

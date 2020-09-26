import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import { CartContext } from '../contexts/CartContext';
import { formatDollar, formartEuros } from '../helpers/utils';
import { changeCurrency, useGlobalState } from '../services/GlobalState';
import { useAlert } from 'react-alert'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 300,
        minHeight: 10,
        maxHeight: 100,
    },
    image: {
        width: 70,
        height: 70,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
              '&:hover':{
                  padding: 3,
              }
    },
    button: {
        height: 20,
        fontSize: 10,
        width: 120,
        // marginLeft: 10,
    },
    button1:{
        height: 18,
        fontSize: 15,
      //   width: 1,
        margin: 1,
        padding: 0,  
        fullWidth: false,
        size: "small",
        minWidth: 30,  
        backgroundColor: "#F50057",
        '&:hover':{
           backgroundColor: 'black',
        }
    },
    button2:{
        height: 18,
        fontSize: 15,
      //   width: 1,
        margin: 1,
        padding: 0,  
        fullWidth: false,
        size: "small",
        minWidth: 30,  
        // backgroundColor: "#F50057",
        '&:hover':{
           backgroundColor: 'black',
        }
    },
    
    description: {
        fontSize: 12,
        fontWeight: 10,
        marginTop: 0
    },
    delete:{
        cursor: 'pointer'
    },
    grid:{
        padding: 0,
        margin: 0,
    }
}));

export default function CartItem({product}) {
    const classes = useStyles();

    const [value] = useGlobalState('currency');
    const { increase, decrease, removeProduct, addProduct, cartItems} = useContext(CartContext);
    const alert = useAlert()

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>

                <Grid container spacing={0} className={classes.grid}>
                    <Grid item>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex"
                                 src={product.photo} height="75px" width="75px"/>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid item xs={10} sm container>
                            <Grid item xs container direction="column" spacing={1}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {product.name}
                                     </Typography>
                                    {/* <Typography className={classes.description} variant="body2" component="p" gutterBottom>
                                        my pizza yoyo, I love , my  ooooo
                                     </Typography> */}
                                    <Typography variant="body2" color="textSecondary" style={{fontSize: 14}}>
                                        <b>S:</b> {product.size} {'  '} <b>Q:</b> {product.quantity}
                                     </Typography>

                                    <Button variant="contained" onClick={() => { increase(product); alert.success('Great, '+product.name+' quantity increase');}}
                                         className={classes.button1} color="primary" >
                                        <AddIcon style={{color: '#ffffff'}} />
                                    </Button>
                                    <span style={{color: 'black', fontSize: 15, fontWeight: 500, padding: 7}}>{product.quantity}</span>
                                    {
                                        product.quantity > 1 &&
                                         <Button variant="outlined" onClick={() => { decrease(product); alert.success('Great, '+product.name+' quantity decrease');}}
                                          className={classes.button2} color="">
                                          <RemoveIcon style={{color: '#F50057'}} />
                                        </Button>
                                    }
                                    {
                                        product.quantity === 1 &&
                                        <Button variant="outlined" 
                                        className={classes.button2} style={{color: "#F50057"}} disabled>
                                        <span><RemoveIcon /> </span>
                                        </Button>
                                    }
                                    
                                    
                                </Grid>
                            </Grid>
                            <Grid item >
                            <Typography gutterBottom variant="subtitle1" style={{color: '#F50057'}}>
                              {!value ? formatDollar(product.price * product.quantity) : formartEuros(product.price * product.quantity * 0.84)}
                            </Typography>
                            <span onClick={() => { removeProduct(product); alert.success('Great, '+product.name+' remove from cart');}}
                             className={classes.trash}><IconButton aria-label="delete" className={classes.margin}> 
                            <DeleteIcon />
                              </IconButton>
                            </span>
                           </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

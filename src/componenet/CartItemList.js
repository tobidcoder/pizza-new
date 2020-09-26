import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import ProductHomeMobile from './ProductHomeMobile';
import { CartContext } from '../contexts/CartContext';
import { formatDollar, formartEuros } from '../helpers/utils';
import { changeCurrency, useGlobalState } from '../services/GlobalState';
import { useAlert } from 'react-alert'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 19,
    },
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: '100%',
    },
    image: {
        width: 50,
        height: 50,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        '&:hover':{
            padding: 5,
        }
    },
    button: {
        height: 20,
        fontSize: 10,
        width: 100,
        // marginLeft: 10,
    },
    button1: {
        height: 17,
        fontSize: 15,
        //   width: 1,
        paddingTop: 10,
        padding: 0,
        margin: 2,
        fullWidth: false,
        size: "small",
        minWidth: 25,
        backgroundColor: "#F50057",
        '&:hover':{
           backgroundColor: 'black',
        }
    },
    button2: {
        height: 17,
        fontSize: 15,
        //   width: 1,
        paddingTop: 10,
        padding: 0,
        margin: 2,
        fullWidth: false,
        size: "small",
        minWidth: 25,
        // backgroundColor: "#F50057",
        '&:hover':{
            backgroundColor: 'black',
         }
    },
    description: {
        fontSize: 10,
        fontWeight: 10,
        marginTop: 0,
        padding: 0,
    },
    delete: {
        cursor: 'pointer'
    },
    title: {
        padding: 0,
        margin: 0,
        lineHeight: 1,
        fontSize: 16,
    },
    icon: {
        color: '#FF6900',
        cursor: 'pointer',
        marginTop: 30,
    },
    // trash:{
    //     paddingRight: 25,
    // }
}));

export default function FullWidthGrid({product}) {
    const classes = useStyles();

    const [value] = useGlobalState('currency');
    const { increase, decrease, removeProduct, addProduct, cartItems} = useContext(CartContext);
    const alert = useAlert()

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={1}>

                    <Grid item xs={2} sm={2}>
                        <img className={classes.img} alt="complex" 
                        src={product.photo} height="75px" width="75px" />
                    </Grid>
                    <Grid style={{ marginTop: 10 }} item xs={3} sm={3}>
                        <Typography className={classes.title} gutterBottom variant="subtitle1">
                            {product.name}
                    </Typography>
                        {/* <Typography className={classes.description} variant="body2" component="p" gutterBottom>
                           {product.description.slice(0, 18)}...
                     </Typography> */}
                        <Typography variant="body2" color="textSecondary" style={{fontSize: 14, fontWeight: 1, marginTop: 20}} >
                            <b>S:</b> {product.size} {'  '} <b>Q:</b> {product.quantity}
                        </Typography>
                    </Grid>

                    <Grid className={classes.icon} item xs={4} sm={4}>
                    
                        <Button variant="contained" onClick={() => { increase(product); alert.success('Great, '+product.name+' quantity increase');}} className={classes.button1} color="primary" style={{ color: '#ffffff', }}>
                            <span><AddIcon /> </span>
                        </Button>
                   
                        <span style={{ color: 'black', fontSize: 18, fontWeight: 500 }}>{product.quantity}</span>
                        {
                            product.quantity > 1 &&
                            <Button variant="outlined" onClick={() => { decrease(product); alert.success('Great, '+product.name+' quantity decrease');}}
                             className={classes.button2} style={{color: "#F50057"}}>
                            <span><RemoveIcon /> </span>
                            </Button>
                        }
                        {
                            product.quantity === 1 &&
                            <Button variant="outlined" 
                             className={classes.button2} style={{color: "#F50057"}} disabled>
                            <span><RemoveIcon /> </span>
                            </Button>
                        }
                        
                        {/* <Button variant="outlined" className={classes.button1} style={{color: "#F50057"}}>
                            <span> <RemoveIcon /> </span>
                        </Button> */}
                        <b>Price : </b>
                         {!value? formatDollar(product.price) : formartEuros(product.price)}
                    </Grid>
                    <Grid item style={{ paddingTop: 35 }} xs={1} sm={1}>
                       Total {!value ? formatDollar(product.price * product.quantity) : formartEuros(product.price * product.quantity * 0.84)}
                       
                     </Grid>
                    <Grid item style={{ paddingTop: 20 }} xs={2} sm={2}>
                        <span  onClick={() => { removeProduct(product); alert.success('Great, '+product.name+' removed from cart');}}  className={classes.trash}><IconButton aria-label="delete" className={classes.margin}>
                            <DeleteIcon />
                        </IconButton>
                        </span>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

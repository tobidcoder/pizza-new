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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 500,
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
    },
    description: {
        fontSize: 12,
        fontWeight: 10,
        marginTop: 0
    },
    delete:{
        cursor: 'pointer'
    }
}));

export default function NewCart() {
    const classes = useStyles();
    const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);
    const [value, setValue] = useGlobalState('currency');
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>

                <Grid container spacing={1}>
                    <Grid item>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src="/img/produc1.jpeg" />
                            </ButtonBase>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                    {
                        cartItems.map(product => 
                   
                        <Grid key={product.id} item xs={10} sm container>
                            <Grid item xs container direction="column" spacing={1}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        Yoyo Piza
                                     </Typography>
                                    <Typography className={classes.description} variant="body2" component="p" gutterBottom>
                                        my pizza yoyo, I love , my  ooooo
                                     </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        S: Medium {'  '} Q: 5
                                     </Typography>
                                    <Button variant="contained" className={classes.button1} color="primary" style={{backgroundColor: '#FF6900',}}>
                                        <AddIcon style={{color: '#ffffff'}} />
                                    </Button>
                                    <span style={{color: 'black', fontSize: 15, fontWeight: 500, padding: 7}}>6</span>
                                    <Button variant="outlined" className={classes.button1} color="">
                                        <RemoveIcon style={{color: '#FF6900'}} />
                                    </Button>
                                    
                                </Grid>
                            </Grid>
                            <Grid item >
                            <Typography gutterBottom variant="subtitle1">
                              $18.90
                            </Typography>
                            <span className={classes.trash}><IconButton aria-label="delete" className={classes.margin}> 
                            <DeleteIcon />
                             </IconButton>
                            </span>
                           </Grid>
                        </Grid>
                        )
                    };
                    </Grid>
                </Grid>
            </Paper>
            
        </div>
    );
}

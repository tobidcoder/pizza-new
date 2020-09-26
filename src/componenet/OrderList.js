import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';


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
        width: 120,
        // marginLeft: 10,
    },
    button1: {
        height: 17,
        fontSize: 15,
        //   width: 1,
        paddingTop: 10,
        padding: 0,
        margin: 5
    },
    description: {
        fontSize: 14,
        // fontWeight: 500,
        marginTop: 10,
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
    }
}));

export default function FullWidthGrid({item}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={1}>

                    <Grid item xs={3} sm={3}>
                        <img className={classes.img} alt="complex" src="/img/produc1.jpeg"  height="85px" width="85px" />
                    </Grid>
                    <Grid style={{ marginTop: 10 }} item xs={5} sm={5}>
                        <Typography className={classes.title} gutterBottom variant="subtitle1">
                            {item.name}
                    </Typography>
                        <Typography className={classes.description} variant="body2" component="p" gutterBottom>
                        <b>Q: </b> {item.quantity} <b>Total: </b>  {item.currency}{item.quantity * item.price}
                     </Typography>
                       
                    </Grid>

                   
                    <Grid item style={{ paddingTop: 35 }} xs={2} sm={2}>
                       {item.currency}{item.price}
                     </Grid>
                    {/* <Grid item style={{ paddingTop: 20 }} xs={2} sm={2}>
                        <span className={classes.trash}><IconButton aria-label="delete" className={classes.margin}>
                            <DeleteIcon />
                        </IconButton>
                        </span>
                    </Grid> */}
                </Grid>


            </Paper>
        </div>
    );
}

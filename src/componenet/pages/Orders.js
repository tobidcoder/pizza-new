import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import OrderList from '../OrderList';
import { Button, Grid, TextField } from '@material-ui/core';
import NewNav from '../NewNav';
import axios from 'axios';
import { TokenService, SetUser } from '../../services/storage.service';
import Config from '../../services/api.config';
import CircularProgress from '@material-ui/core/CircularProgress';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';


export default function Orders() {
  const history = useHistory();
  const [nodata, setNodata] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false)
  const email = TokenService.getUserEmail()

    function getOrderItems(){
         setLoading(true)
        axios.post(`${Config.baseUrl}/order/items`,{ email }, {
        }, Headers )
        .then((response) => {

            if(response.data.data.success === false) {
               setNodata(true)
            };         

            setItems(response.data.data)
          
        }, (error) => {

          console.log(error);
          
        })
        .finally(function () {
          setLoading(false);
          if(items.length < 1){
            setNodata(false);
           }
        })
    }

    useEffect(() => {
        getOrderItems()
        
    }, [])


   console.log(items)
   
  return (
    <React.Fragment>
      <NewNav />
      <CssBaseline />
      <Container maxWidth="sm">
      <Typography component="h6" variant="h4" style={{textAlign: 'center', paddingTop: 105}}>
          Orders History
      </Typography>
       {!nodata ? 
         items.map(item =>  <OrderList key={item.id} item={item} />)
       : (
        <Typography variant="h5" style={{textAlign: 'center'}}>
          <RemoveShoppingCartIcon  style={{textAlign: 'center', fontSize: 120, color: "#F50057"}}/>
          <p color="secondary" onClick={()=> history.push('/')} style={{textAlign: 'center', fontSize: 16, color: "#F50057", cursor:"pointer"}}>Click Here to Start Shopping!</p>
         </Typography>
         )
       }
          {/* <Typography style={{textAlign: 'right', fontSize: 15, marginTop: 15}} component="h4" variant="h6">
          <b>Total Cart: </b> {' '} $123.90
          <br></br>
          <b>Shipping Fee:</b> {' '} $8.00
          <br></br>
          <b>Total:</b> {' '} $45.99
        </Typography> */}
        {/* <Typography component="h4" variant="h5">
          Shipping Information
        </Typography> */}
        {/* <Grid container>
          <Grid item xs style={{padding: 15}}>
          <TextField id="standard-basic" label="Name" />
          <TextField id="standard-basic" label="Phone" type="number" />
          <TextField id="standard-basic" label="Zip Code" type="number" />
          </Grid>
          <Grid item xs style={{padding: 15}}>
          <TextField id="standard-basic" label="Email" type="email" />
          <TextField
          id="standard-textarea"
          label="Delivery Address"
          multiline
           />
          </Grid>
        </Grid> */}
        <p style={{textAlign: 'center'}}>
        {loading ? 
         <CircularProgress color="secondary"/>
        : null}
        </p>
        <div style={{marginTop: 25, textAlign: 'right'}}>
        <Button variant="contained" onClick={() => history.push('/') } style={{margin: 15}} color="secondary">
          Menu
        </Button>
        
        </div>
      </Container>
    </React.Fragment>
  );
}

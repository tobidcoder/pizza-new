import React, {useContext} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useHistory } from 'react-router-dom';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import CartItem from './CartItem';
import { Link }from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { formatDollar, formartEuros } from '../helpers/utils';
import { changeCurrency, useGlobalState } from '../services/GlobalState';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appbar:{
    backgroundColor: '#F50057',
    color  : "secondary",
    borderBottomLeftRadius: 55,
    borderBottomRightRadius: 55,
  },
  currency:{
    fontSize: 40,
    fontWeight: 500,
},
cartitem:{
    margin: 1,
    padding: 2,
},
isValue:{
  backgroundColor: '#ffffff',
   color: '#F50057',
   '&:hover':{
    backgroundColor: '#ffffff',
    color: '#F50057'
   }

}
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const preventDefault = () => window.location.reload(false);
  const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);
  const [value, setValue] = useGlobalState('currency');
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
 const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to="/auth">
        Login/SignIn</MenuItem>
      <MenuItem component={Link} to="/orders" >My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit" component={Link} to="/carts">
          <Badge badgeContent={itemCount} color="secondary">
            <AddShoppingCartIcon />
          </Badge>
        </IconButton>
        {/* <p component={Link} to="/carts">Cart</p> */}
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new Order History" color="inherit" component={Link} to="/orders">
          <Badge badgeContent={11} color="secondary">
            <HistoryIcon className={classes.currency} />
          </Badge>
        </IconButton>
        {/* <p component={Link} to="/orders">Order History</p> */}
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Button onClick={()=> setValue(false)} style={{fontSize: 30,fontWeight: 500,}} className={value? '' : classes.isValue }  color="inherit">$</Button>
           <Button onClick={()=> setValue(true)} style={{fontSize: 30,fontWeight: 500,}} className={value? classes.isValue : '' }  color="inherit">€</Button>
            <Button color="inherit" component={Link} to="/">MENU</Button>
          <div className={classes.search}>
            {/* <div className={classes.searchIcon}>
              <SearchIcon />
            </div> */}
            {/* <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            /> */}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit" 
            >
              <Badge badgeContent={itemCount} color="secondary">
                <AddShoppingCartIcon 
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                // onClick={(history) => history.push('/carts')}
                //onMouseOverCapture={handleToggle}
                onMouseEnter = {handleToggle}
        
                className={classes.currency} />
                
              </Badge>
              
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'left' }}
            >
            <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <div> {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                    <div className={classes.cartitem}>
                    {cartItems.length > 0 ?
                        cartItems.map(product =>  <CartItem key={product.id} product={product}/>)
                    :
                    <Typography variant="h5" style={{textAlign: 'center'}}>
                    <RemoveShoppingCartIcon  style={{textAlign: 'center', fontSize: 60, color: "#F50057"}}/>
                    <p color="secondary" onClick={()=> history.push('/')} style={{textAlign: 'center', fontSize: 16, color: "#F50057", cursor:"pointer"}}>Click Here to Start Shopping!</p>
                   </Typography>
                    }
                   
                    </div>
                    <hr></hr>
                    {cartItems.length < 1 ? null :(
                    
                    <Typography style={{textAlign: 'right', margin: 5}} variant="h6" component="h3">
                    
                        Total :                        
                          <span style={{textAlign: 'right'}}> 
                          
                          {!value ? formatDollar(total) : formartEuros(total * 0.84)}
                          </span> 
                    <Button variant="contained" onClick={() => history.push('/carts') } style={{margin: 2, fontSize: 10}} color="secondary">
                      Continue Shopping
                    </Button>
                    </Typography>
                    )}
                    
                                    </div>
                    {/* <div style={{marginTop: 25, textAlign: 'right'}}>
                    <Button variant="contained" onClick={() => history.push("/") } style={{margin: 15}} color="secondary">
                      Menu
                    </Button>
                    <Button variant="contained"  onClick={() => history.push("/carts") } color="secondary">
                   Pace Order                    
                    </Button>
                    </div> */}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
            <IconButton aria-label="show 17 new notifications" color="inherit" component={Link} to="/orders">
              {/* <Badge badgeContent={17} color="secondary"> */}
                <HistoryIcon className={classes.currency} />
              {/* </Badge> */}
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle className={classes.currency} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
     
    </div>
  );
}

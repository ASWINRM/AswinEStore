import React from 'react'
import { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import Rating from './Rating';
import { Link } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { addwishaction, removewishaction } from '../Actions/WishlistAction'
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 490,
    maxHeight: 490,

  },
  media: {
    height: 100,
    width: '100%',
    paddingTop: '56.25%', // 16:9
  },

  brandlogo: {
    height: '100%',
    width: '100%',
    borderRadius: "50%"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

  avatar: {
    backgroundColor: red[500],
  },

}));


const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}))(Tooltip);


const Product = ({ history, product }) => {
  const dispatch = useDispatch()
  const userloginreducer = useSelector(state => state.userloginreducer)
  const classes = useStyles()
  var [design, setdesign] = useState(false)
  var [tiptitle, settiptitle] = useState("wishlist")
  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: "#d10f0a"
      },
      primary: {
        main: "#A9A9A9",
      },
    }
  })
  const wishlistreducer = useSelector(state => state.wishlistreducer)
  const { wishlistitems } = wishlistreducer

  useEffect(() => {
    wishlistitems && wishlistitems.length > 0 && wishlistitems.map((item) => {
      if (item.name === product.name) {
        setdesign(true)
      }
    })

  }, [wishlistitems, product.name])
  const wishlist = (product) => {
    const { userinfo } = userloginreducer
    if (!userinfo) {
      return settiptitle("Please Login to wishlist an item!")
    }
    console.log(product)
    dispatch(addwishaction(product))
    setdesign(true)
    settiptitle("Added to wishlist")

  }

  const unwish = (product) => {
    setdesign(false)
    settiptitle("wishlist")
    dispatch(removewishaction(product))
  }
  return (
    <Card className={classes.root}>

      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img className={classes.brandlogo} src={product.brandlogo} alt="brandlogo"></img>
          </Avatar>
        }
        title={product.name.substring(0, 30)}
        subheader={<Rating value={product.rating} text={`${product.numReviews} Reviews`}></Rating>}
      // {product.rating} Ratings from {product.numReviews} Reviews
      />
      <div className="cardmedia">
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
          />
        </Link>
      </div>

      <CardContent>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="textSecondary" component="span">
            {product.description.substring(0, 110)} ...
            <div className="Rupee">
              <i className="fas fa-rupee-sign">{product.price}</i>
            </div>
          </Typography>
        </Link>
      </CardContent>


      <CardActions disableSpacing >
        <ThemeProvider theme={theme}>
          <LightTooltip title={tiptitle}>
            <IconButton aria-label="add to favorites"
              onClick={design ? () => unwish(product) : () => wishlist(product)} >
              <FavoriteIcon color={design ? "secondary" : "primary"} />

            </IconButton>
          </LightTooltip>
        </ThemeProvider>

      </CardActions>
    </Card>
  );
}

export default Product

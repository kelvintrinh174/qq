import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Product } from "../../models/Product";
import Button from "@material-ui/core/Button";
import '../../styles/ProductContainer.css'
import axios from "axios";
import { UserContext } from "../../App";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      minWidth: 275,
      margin: "2%",
    },
    media: {
      height: 150
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    category: {
      color: "textPrimary",
    },
  })
);

interface IProductDetailProps {
  product: Product;
}

export const ProductCard: React.FunctionComponent<IProductDetailProps> = (
  props
) => {
  let currentUser = React.useContext(UserContext);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const addToCart = () => {
    axios.post(
    `http://ec2-18-218-116-207.us-east-2.compute.amazonaws.com:10000/customers/addItem/${props.product.id}/${1}/${currentUser.userId}`,
    // JSON.stringify(order),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {

      // ordersPending = res.data;
      // let temp:any[] = res.data
      // console.log(res.data)
      // console.log(typeof(res.data[0]))
      // updateOrderDisplay(temp)

    })
    alert(`You just added ${props.product.title}`);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader title={props.product.title} />
      <CardMedia
        className={classes.media}
        image={props.product.image}
        title={props.product.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.product.price}$
        </Typography>
        <Button variant="contained" color="primary" onClick={addToCart}>
          Add to cart
        </Button>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{props.product.description}</Typography>
          <Typography paragraph>Category: </Typography>
          <Typography color={"textSecondary"}>
            {props.product.category}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

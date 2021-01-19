import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { Container, Paper, Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { getActiveCart, getlistItemDetail } from "../services/cart-functions";
import { UserContext } from "../App";
import { Product } from "../models/Product";
import { submitOrder } from "../services/order-function";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      position: "relative",
      // zIndex: 1100,
      marginTop: "5px",
      marginBottom: "45px",
    },
    containerBill: {
      position: "relative",
      marginTop: "5px",
      marginBottom: "5px",
    },
    mainBox: {
      position: "relative",
      marginTop: "50px",
      padding: "10px 20px",
      borderBottomRightRadius: "4px",
      borderBottomLeftRadius: "4px",
      background: theme.palette.background.default,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    control: {
      padding: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
  })
);

//Reference: https://github.com/angeloron/react-material-ui-stripe-payment-form
//https://medium.com/javascript-in-plain-english/stripe-payment-form-with-reactjs-and-material-ui-part-4-118e60fca962
export const Payment: React.FunctionComponent<any> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [listItems, setListItems] = useState<Product[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [cartNumber, setCartNumber] = useState();
  let currentUser = useContext(UserContext);
  const cardsLogo = ["amex", "discover", "mastercard", "visa", "paypal"];

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let order = {
      orderAdditionalInstructions: "N/A",
      orderCart: {
        cartId: cartNumber,
        cartOwner: {
          cartOwners: [null],
          cartShopper: null,
        },
        cartShopper: null,
        cartStatus: "ACTIVE",
      },
      orderCustomer: currentUser,
      orderId: 0,
      orderNetAmount: subTotal,
      orderResolved: null,
      orderShopper: null,
      orderStatus: "PENDING",
      orderSubmitted: Date.now(),
      order_gross_amount: subTotal * 1.13,
      order_tax_amount: subTotal * 0.13,
    };
    if (currentUser) {
      let orderSubmited = await submitOrder(order, currentUser.userId);
      if (orderSubmited) {
        alert(
          `You place order successfully! Your Order Number is ${orderSubmited.orderId}`
        );
        history.push("/profile");
      } else {
        alert(`Oops there is st wrong!`);
      }
    }
  };

  useEffect(() => {
    let getCart = async () => {
      let lists = await getActiveCart(currentUser.userId);
      if (lists && lists.cartId) {
        setCartNumber(lists.cartId);
        let data = await getlistItemDetail(lists.listItems);
        setListItems(data);
        const reducer = (accumulator: number, currentValue: number) =>
          accumulator + currentValue;
        let result = data
          .map((item: Product) => {
            return item.amount * item.price;
          })
          .reduce(reducer, 0);
        setSubTotal(result);
      }
    };
    if (currentUser) {
      getCart();
    }
  }, [currentUser]);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Container maxWidth="md" className={classes.containerBill}>
          <Paper elevation={5}>
            <Box className={classes.mainBox}>
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Total Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listItems.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">
                          {row.amount * row.price}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow key="subTotal">
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">SubTotal</TableCell>
                      <TableCell align="right">{subTotal.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow key="tax">
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">Tax (13%)</TableCell>
                      <TableCell align="right">
                        {(subTotal * 0.13).toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow key="Total">
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">
                        {(subTotal * 1.13).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Container>
        <Container maxWidth="md" className={classes.container}>
          <Paper elevation={5}>
            <Box className={classes.mainBox}>
              <form className={classes.form}>
                <Grid container spacing={3}>
                  <Grid container item xs={12}>
                    <Typography variant="h6">Payment Data</Typography>
                  </Grid>
                  <Grid container item xs={12}>
                    {cardsLogo.map((e: string) => (
                      <img
                        key={e}
                        src={`./cards/${e}.png`}
                        alt={e}
                        width="50px"
                        text-align="bottom"
                        style={{ padding: "0 5px" }}
                      />
                    ))}
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      label="Credit Card Number"
                      name="number"
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Amount"
                      name="amount"
                      variant="outlined"
                      required
                      fullWidth
                      value={(subTotal * 1.13).toFixed(2)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      label="Expiration Date"
                      name="ccexp"
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      label="CVC"
                      name="cvc"
                      variant="outlined"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid container item justify="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={(e) => handleSubmit(e)}
                    >
                      Place order
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </div>
  );
};

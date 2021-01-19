import React, { useContext, useEffect } from 'react';
import axios from "axios";
import { UserContext } from "../App";
import '../styles/CustomerHistory.css'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { AutorenewTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const CustomerHistory: React.FunctionComponent<any> = (props) => {

  const classes = useStyles();
  const [orderStatus, setOrderStatus] = React.useState('');
  const [currentOrderDisplay, updateOrderDisplay] = React.useState([]);

  let currentUser = useContext(UserContext);

  useEffect(() => {

    axios.get(
      `http://ec2-18-218-116-207.us-east-2.compute.amazonaws.com:10000/orders/history/${orderStatus}/${currentUser.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {

        let temp: any[] = res.data
        updateOrderDisplay(temp)

      })

  }, [orderStatus])

  const handleChange = (e: React.ChangeEvent<any>) => {
    setOrderStatus(e.target.value)
  };

  return (

    <div className='historyComponentWrapper'>
      <h2>Your Purchase History: </h2>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Order Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={orderStatus}
          onChange={handleChange}
          label="Order Status"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'active'}>Active Orders</MenuItem>
          <MenuItem value={'closed'}>Completed Orders</MenuItem>
          <MenuItem value={'pending'}>Pending Orders</MenuItem>
        </Select>
      </FormControl>

      <div className='historyContainer'>
        <div className='historyCard'>
          {
            currentOrderDisplay.length > 0 ? (
              <div>{currentOrderDisplay.map((hist) => {
                return (
                  <div className='historyCardContents'>
                    <div className='historyIdAndTimeWrapper'>
                      <p className='historyOrderId'>
                        {'Order ID: ' + hist.orderId}
                      </p>
                      <p className='historyOrderSubmitted'>
                        {'Submitted: ' + new Date(hist.orderSubmitted).toLocaleDateString("en-US")}
                      </p>
                    </div>
                    <p className='historyOrderNetAmount'>
                      {'Items Subtotal: $' + hist.orderNetAmount}
                    </p>
                    <p className='historyOrderTaxAmount'>
                      {'GST: $' + hist.order_tax_amount}
                    </p>
                    <p className='historyOrderGrossAmount'>
                      {'Total: CDN $' + hist.order_gross_amount}
                    </p>
                  </div>
                )
              })}
              </div>
            ) : (
                <p>No order history to display</p>
              )
          }
        </div>
      </div>

    </div>

  )

}
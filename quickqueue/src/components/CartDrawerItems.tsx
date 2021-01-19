import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProductListContext } from "./StoreFront";
import axios from "axios";
import { UserContext } from "../App";
import { Product } from "../models/Product";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import '../styles/CartDrawerItems.css'

interface ICartViewProps {
  getItemList: () => Promise<Product[]>;
  cartContents: Product[];
}

export const CartDrawerItems: React.FunctionComponent<ICartViewProps> = (
  props
) => {
  const history = useHistory();
  const currentUser = React.useContext(UserContext);
  const allItems = React.useContext(ProductListContext);

  const [itemsFromDB, updateItemFromDB ] = useState<CartItemObject []>([]);
  const [itemList, updateItemList] = useState<Product[]>([]);
  const [totalPrice, updatePrice] = useState<Number>(0);

  class ItemId {
    cartId: number
    itemId: number
  }

  class CartItemObject {
      cartItemId:ItemId
      quantity:number
  }

  useEffect(() => {
    async function getCart() {
    try {
      axios
        .get(
          `http://ec2-18-218-116-207.us-east-2.compute.amazonaws.com:10000/cart/active/${currentUser.userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // let temp:any[] = res.data
          console.log(JSON.stringify(res.data))
          console.log(JSON.parse(JSON.stringify(res.data.cartItems)))
          updateItemFromDB(JSON.parse(JSON.stringify(res.data.cartItems)));
          // updateItemFromDB(res.data.cartItems);
        });
    } catch (e) {
    }
  }
    getCart()

    console.log(itemsFromDB);
  }, [allItems, currentUser.userId]);

  useEffect(() => {
    console.log(itemsFromDB + " in new use effect")
    let prodArr :Product[] = []
    itemsFromDB.forEach((item, i)=>{
      console.log(item)
      let prodFromFakeStore = allItems && allItems.find(e => {
        return e.id === item.cartItemId.itemId
      })
      console.log(prodFromFakeStore)
      let prod: Product = prodFromFakeStore;
      console.log(prod)
      prod.amount = item.quantity;
      prodArr.push(prod)
    })
    
    updateItemList(prodArr);


  }, [itemsFromDB]);

  useEffect(() => {
    updatePrice(itemList && itemList.reduce((a, b) => a + b.price * (b.amount || 1), 0));
  }, [itemList]);

  console.log(totalPrice);

  return (
    <List>
      {itemList && itemList.map((item: Product) => (
        <ListItem button key={item.title}>
          {`Qty. ${item.amount || 1}`}
          <img src={item.image} alt={item.title} width="100" height="100" />
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
      <Divider />
      <ListItem>{`Total $${totalPrice && totalPrice.toFixed(2)}`}</ListItem>
      <Divider />
      <ListItem>
        <button
          className="cartNavButton"
          type="button"
          onClick={() => history.push("/payment")}
        >
          Go To Checkout
        </button>
      </ListItem>
    </List>
  );
};

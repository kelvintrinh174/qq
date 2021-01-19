import React, { useState, useEffect } from "react";
import axios from "axios";
import {Item} from "../models/Item";

interface IItemViewProps {
  // currentUser: User;
}

export const ItemView: React.FunctionComponent<IItemViewProps> = (props) => {
  
  const [itemList, updateList] = useState<Item[]>([]);

  //will only run once due to empty array as second param
  useEffect(() => {
    try {
      axios.get("https://fakestoreapi.com/products").then((res) => {
        updateList(res.data);
      });
    } catch (e) {
      console.log(e)
    }
  }, []);
  console.log(itemList);

  const [filter, changeFilter] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeFilter(e.target.value);
  };
  return (
    <div>
      {itemList.map((item: Item) => (
        <div>
        <p>{item.title}</p>
        {/* <p>{item.category}</p>
        <p>{item.description}</p>
        <p>{item.price}</p>
        <p>{item.id}</p> */}
        </div>
      ))}
    </div>
  );
};

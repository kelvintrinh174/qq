import React, { SyntheticEvent, useState, useContext, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../App";
import { Product } from "../models/Product";
import {
  getAllProduct,
  getProductByCategory,
} from "../services/product-functions";
import { NavBar } from "./NavBar";
import { ProductContainer } from "./products/ProductContainer";

export const ProductListContext = React.createContext<Product[]>(undefined);

export const StoreFront: React.FunctionComponent<any> = (props) => {
  let currentUser = useContext(UserContext);

  const [productList, setProductList] = useState<Product[]>();

  return currentUser ? (
    <ProductListContext.Provider value={productList}>
      <NavBar
        currentProductList={productList}
        setCurrentProductList={setProductList}
      />
      <ProductContainer
        currentProductList={productList}
        setCurrentProductList={setProductList}
      />
    </ProductListContext.Provider>
  ) : (
    <Redirect to="/login" />
  );
};

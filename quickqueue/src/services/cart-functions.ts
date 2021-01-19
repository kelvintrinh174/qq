import { quickqueueApiBase as clientQQ } from "./quickqueueApi";
import { fakeStoreApiBase as clientFS } from "./fakestoreApi";
import { Product } from "../models/Product";

export const getActiveCart = async (userId: number): Promise<any> => {
  try {
    let res = await clientQQ.get(`/cart/active/${userId}`);
    let listItems: [number];
    let cartNumber = 0;
    if (res.status === 200) {
      listItems = res.data.cartItems.map((e: any) => {
        return { itemId: e.item.itemId, quantity: e.quantity };
      });
      cartNumber = res.data.cartId;
    }

    return { listItems, cartId: cartNumber };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getlistItemDetail = async (
  listItems: Array<Object>
): Promise<any> => {
  try {
    let products: Promise<Product>[] = listItems.map(async (e: any) => {
      let product = await getItemDetailById(e.itemId);
      product.amount = e.quantity;
      return product;
    });

    return await Promise.all(products);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getItemDetailById = async (itemId: number): Promise<Product> => {
  try {
    let res = await clientFS.get(`/products/${itemId}`);

    let product = new Product();
    product.id = res.data.id;
    product.title = res.data.title;
    product.price = res.data.price;
    return product;
  } catch (e) {
    throw new Error(e.message);
  }
};

import { quickqueueApiBase as clientQQ } from "./quickqueueApi";

export const submitOrder = async (order: any, userId: number): Promise<any> => {
  try {
    let res = await clientQQ.post(`/orders/submit/${userId}`, order);

    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderProduct, Basket, BasketProduct, Product } from "../models";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";
// import { Object as DataStoreObject } from "@aws-amplify/datastore";
const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const { shop, totalPrice, basketProducts, basket } = useBasketContext();
  // const [basketsToDelete, setBasketsToDelete] = useState([]);
  // const [basketsToDelete, setBasketsToDelete] = useState(null);
  const [orders, setOrders] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (dbUser) {
      const fetchData = async () => {
        const fetchedOrders = await DataStore.query(Order, (o) =>
          o.userID.eq(dbUser.id)
        );
        const ordersWithDetails = await Promise.all(
          fetchedOrders.map(async (order) => {
            const shop = await order.Shop;
            const orderProducts = await DataStore.query(OrderProduct, (op) =>
              op.orderID.eq(order.id)
            );
            const productsWithDetails = await Promise.all(
              orderProducts.map(async (orderProduct) => {
                const productQuery = await DataStore.query(Product, (p) =>
                  p.id.eq(orderProduct.orderProductProductId)
                );
                return {
                  ...orderProduct,
                  Product: productQuery,
                };
              })
            );
            return {
              ...order,
              Shop: shop,
              OrderProducts: productsWithDetails,
            };
          })
        );
        setOrders(ordersWithDetails);
      };
      fetchData();
    }
  }, [dbUser]);

  const createOrder = async () => {
    // create the order

    const newOrder = await DataStore.save(
      new Order({
        userID: dbUser.id,
        Shop: shop,
        status: "NEW",
        total: totalPrice,
      })
    );
    // add all basketProducts to the order
    await Promise.all(
      basketProducts.map((basketProduct) =>
        DataStore.save(
          new OrderProduct({
            quantity: basketProduct.quantity,
            orderID: newOrder.id,
            Product: basketProduct.Product,
          })
        )
      )
    );

    // delete the basket record
    // await DataStore.delete(basket?.id);
    setOrders([...orders, newOrder]);
  };

  const getOrder = async (id) => {
    const order = await DataStore.query(Order, id);
    const orderProducts = await DataStore.query(OrderProduct, (od) =>
      od.orderID.eq(id)
    );

    const products = await Promise.all(
      orderProducts.map(async (orderProduct) => {
        const product = await DataStore.query(
          Product,
          orderProduct.orderProductProductId
        );
        return product;
      })
    );

    return { ...order, PRoducts: products };
  };

  return (
    <OrderContext.Provider value={{ createOrder, orders, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);

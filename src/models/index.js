// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TransportationModes = {
  "TEMPO_VAN": "TEMPO_VAN",
  "BIKE": "BIKE"
};

const OrderStatus = {
  "NEW": "NEW",
  "PACKED": "PACKED",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED",
  "ACCEPTED": "ACCEPTED"
};

const { Courier, OrderProduct, Product, Order, Shop, BasketProduct, Basket, User } = initSchema(schema);

export {
  Courier,
  OrderProduct,
  Product,
  Order,
  Shop,
  BasketProduct,
  Basket,
  User,
  TransportationModes,
  OrderStatus
};
import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Basket, BasketProduct } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext({});

  const [shop, setBasketShop] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketsToDelete, setBasketsToDelete] = useState([]);
  const [basketProducts, setBasketProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (basketProducts.length === 0) {
      setTotalPrice(0);
      return;
    }

    setTotalPrice(
      basketProducts.reduce(
        (sum, basketProduct) =>
          sum +
          (basketProduct.Product
            ? basketProduct.quantity * basketProduct.Product.price
            : 0),
        shop?.deliveryFee || 0
      )
    );
  }, [basketProducts, shop]);

  useEffect(() => {
    if (shop) {
      DataStore.query(Basket, (p) => p.shopID.eq(shop.id))
        .then((baskets) => {
          if (baskets.length === 0) {
            createNewBasket().then((newBasket) => setBasket(newBasket));
          } else {
            setBasket(
              baskets.filter((basket) => basket.userID === dbUser.id)[0]
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dbUser, shop]);

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketProduct, (d) => d.basketID.eq(basket.id)).then(
        async (basketProducts) => {
          const products = await Promise.all(
            basketProducts.map((basketProduct) => basketProduct.Product)
          );
          setBasketProducts(
            basketProducts.map((basketProduct, i) => ({
              ...basketProduct,
              Product: products[i],
            }))
          );
        }
      );
    }
  }, [basket]);

  const addProductToBasket = async (product, quantity) => {
    // console.log("add dish to basket", product, quantity);
    // create a BasketProduct item and save to DataStore
    let theBasket = basket || (await createNewBasket());
    const newProduct = await DataStore.save(
      new BasketProduct({ quantity, Product: product, basketID: theBasket.id })
    );
    setBasketProducts([...basketProducts, newProduct]);
  };

  const createNewBasket = async () => {
    const newBasket = await DataStore.save(
      new Basket({ userID: dbUser.id, shopID: shop.id })
    );
    setBasket(newBasket);
    return newBasket;
  };

  // const onPlus = () => {};

  // const onMinus = () => {};
  // console.log(basketProducts);

  // console.log("Basket:", basket);
  return (
    <BasketContext.Provider
      value={{
        addProductToBasket,
        setBasketShop,
        basket,
        basketProducts,
        shop,
        setBasketProducts,
        totalPrice,

        // basketsToDelete,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);

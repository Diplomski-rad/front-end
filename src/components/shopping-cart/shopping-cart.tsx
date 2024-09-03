import React, { useEffect, useState } from "react";
import styles from "./shopping-cart.module.css";
import Checkout from "./checkout/checkout";
import Course from "../model/Course";
import CartItem from "./cart-item/chart-item";

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const getTotal = (): number => {
    return cartItems.reduce((total, course) => total + course.price, 0);
  };

  const handleRemove = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    sessionStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return (
    <div className={styles["shopping-cart-container"]}>
      <div className={styles["shoping-cart-header"]}>
        <h1>Shopping cart</h1>
      </div>
      <hr />
      {cartItems.length > 0 ? (
        <div className={styles["middle-container"]}>
          <div className={styles["items-container"]}>
            {cartItems.map((course) => (
              <CartItem
                key={course.id}
                course={course}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <div className={styles["total-container"]}>
            <Checkout total={getTotal()} courses={cartItems} />
          </div>
        </div>
      ) : (
        <div className={styles["empty-cart"]}>No items in your cart</div>
      )}
    </div>
  );
};

export default ShoppingCart;

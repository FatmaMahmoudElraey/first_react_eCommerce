// CartContext.js
import React, { createContext, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderAction } from "../store/orderSlice";
import { editProductAction } from "../store/productSlice";
import Swal from "sweetalert2";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch()
  const products = useSelector((state) => state.productSlice.products);
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingProductIndex !== -1) {
        // If the product exists, update its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
        return updatedCart;
      } else {
        // If the product is not in the cart, add it with a default quantity of 1
        const updatedCart = [...prevCart, { ...product, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
        return updatedCart;
      }
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
      return updatedCart;
    });
  };

  const updateQuantity = (index, quantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
      return updatedCart;
    });
  };
  const checkOut = () =>{
    let overflowingItems = []
    const orderObject = {
      user:JSON.parse(localStorage.getItem("user")).id,
      items:cart
    }
    const prods = products.map((p)=>p.id == cart.find((c)=>c.id==p.id)?.id && p)
    prods.forEach((p)=>{
      if(p.quantity < cart.find((c)=>c.id==p.id)?.quantity){
        overflowingItems.push(p)
      }
    })
    if(overflowingItems.length > 0){
      Swal.fire({
        text:"some items are out of stock!\n" + overflowingItems.map((p)=>`${p.name}: ordered ${cart.find((c)=>c.id==p.id)?.quantity}, available ${p.quantity}`).join(",\n"),
        icon:"warning",
        confirmButtonColor:"#dc3545"      
      })
      return
    }else{
      dispatch(addOrderAction(orderObject))
      cart.forEach((e)=>{
        const item ={quantity:products.find((p)=>p.id==e.id).quantity - e.quantity,id:e.id}
        dispatch(editProductAction({id:e.id, product:item}))
      }
    )
    setCart([])
    Swal.fire({
      text:"order placed successfully",
      icon:"success",
      confirmButtonColor:"#dc3545"

    }).then((result)=>{
      window.location.assign("/")
    })
  }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, checkOut }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
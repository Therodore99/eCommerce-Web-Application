import React from "react";
import { useDispatch } from "react-redux";

const CheckoutPage = ({ p }) => {

const {brand} = p;
let dispatch = useDispatch();
  
const changeCartQuantity = e => {

    let count = e.target.value
    if(count > 1){
        count = e.target.value;
    }else if(count < 1){
        count = 0;
        productRemove();
    }

    if(count > p.stock) {
      alert(`Max available quantity: ${p.stock}`);
      return;
    }
    let shoppingCart = [];

      if (localStorage.getItem("shoppingCart")) {
        shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
      }

      shoppingCart.map((product, i) => {
        if (product._id == p._id) {
          shoppingCart[i].count = count;
        }
      });

      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
      dispatch({
        type: "ADD_TO_CART",
        payload: shoppingCart,
      });
    
};
const productRemove = () => {

  let shoppingCart = [];

  if (typeof window !== "undefined") {
    if (localStorage.getItem("shoppingCart")) {
      shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    }
    shoppingCart.map((p, i) => {
      if (p._id === p._id) {
        shoppingCart.splice(i, 1);
      }
    });
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    dispatch({
      type: "ADD_TO_CART",
      payload: shoppingCart,
    });
  }
};
  return (
    <tbody>
      <tr>
        <td>            
          <img
            src={"/images/"+brand+'.jpeg'}
            style={{ height: "120px", width: "130px"}}
          />
        </td>
        <td>{p.title}</td> 
        
        <td>
          <input type = "number" onChange={changeCartQuantity} value = {p.count}></input> 
        </td>

        <td>${p.price}</td>

        <td>
          <button 
              onClick={productRemove}
              className="text-danger pointer">X
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default CheckoutPage;

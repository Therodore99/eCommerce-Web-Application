import React from "react";
import { Link } from "react-router-dom";
import CheckoutPage from "../components/cards/CheckoutPage";
import { useSelector, useDispatch } from "react-redux";


const Cart = ({product, p}) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleCheckout = () => {
    alert('The items have been paid and they have been delivered');

    let shoppingCart = [];
      if (localStorage.getItem("shoppingCart")) {
        shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
      }

      for(var i = 0; i < shoppingCart.length + 1; i++){
        shoppingCart.map((p, i) => {
        shoppingCart.splice(i, 1);  
      });
      }
      
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
      dispatch({
        type: "ADD_TO_CART",
        payload: shoppingCart,
      });
  };

  const showCart = () => {
      if(!cart.length){
        return(
          <a><Link to="/">Please continue Shopping</Link></a>
        )
      }else{
        return(
          <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Count</th>
                  <th scope="col">Price</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
      {cart.map((p) => (
        <CheckoutPage key={p._id} p={p} />
      ))}
    </table>
        )
      }
  }

    const finalPrice = () => {
      var price = 0
      let shoppingCart = []
      shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
      for(let i = 0; i < shoppingCart.length; i++){
          price = parseInt(shoppingCart[i].count) * parseInt(shoppingCart[i].price) + price
        }
        return(price)
      }

  return (
      <div>
        <div>
          <h2>Total Product :  {cart.length}</h2>
          {showCart()}
        </div>
        
        <div className="col-md-4">
          <h3>Cart Detail</h3>
          <hr/>
          <hr />
          Total: <b>${finalPrice().toFixed(2)}</b>
          
          <hr />
          {user ? (
            <Link
            onClick={handleCheckout}
            disabled={!cart.length}
            to={{
              pathname: "/login",
              state: { from: "home" },
            }}
          >
            Please Checkout
          </Link>
          ) : (
            <button>
              <Link to={{pathname: "/login",state: { from: "cart" },}}>
                Login in
              </Link>
            </button>
          )}
        </div>
      </div>
   
  );
};

export default Cart;

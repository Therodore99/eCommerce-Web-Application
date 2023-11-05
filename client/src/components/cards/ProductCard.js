import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { showAverage } from "../../functions - axios/rating";
import _ from "lodash"
import { Card , Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState('Click to add');
  // destructure
  const { images, title, slug, brand, comment } = product;
  const {user, shoppingCart} = useSelector((state) => ({...state}));
  const dispatch = useDispatch();

  const checkNum = function(inputNum){
    var reg = /^[0-9]+.?[0-9]*$/;
    if(!reg.test(inputNum)){
      return false;
    }else
      return true;
}

const handleAddToCart = function(){
  if(product.stock >= 0){
    
  var inputCount = prompt("Please enter the amount you want to add to the shoppingCart", "0");
  //console.log("Comment"+product.comment);
  
  //alert(inputCount);
  if (inputCount !== null && inputCount !== "" && checkNum(inputCount)) {
    if(inputCount < product.stock){
      // for(let i = 0; i < shoppingCart.length; i++){

      // }
      
    let shoppingCart = []
    if(typeof window !== 'undefined'){
      if(localStorage.getItem('shoppingCart')){
        shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
      }
      var flag = true;
      if(shoppingCart != []){
        
        var title = shoppingCart.title
        for(let i = 0; i < shoppingCart.length; i++){
          //alert(shoppingCart[i].title)
          if(product.title == shoppingCart[i].title){
            if((parseInt(inputCount) + parseInt(shoppingCart[i].count)) > parseInt(product.stock)){
                alert("Insufficient inventory!!")
              }else{
              shoppingCart[i].count = shoppingCart[i].count + parseInt(inputCount);   
            }
            
            //shoppingCart[i].count = shoppingCart[i].count + inputCount;
            flag = false;
          }
        }
        if(flag){
          shoppingCart.push({
            ...product,
            count: parseInt(inputCount),
            //count: 1,
          });
        }
      }

      let unique = _.uniqWith(shoppingCart, _.isEqual)
      localStorage.setItem('shoppingCart', JSON.stringify(unique));

      setTooltip("Added");

      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
    }
  } else{
    alert("Insufficient inventory!")
  }  
}else{
  alert("Please input the right number!")
}
}else{
  alert("No stock!")
}
};
  
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}

      <Card
        cover={
          <img
            src={"/images/"+brand+'.jpeg'}
            style={{ height: "40%"  }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
          <a onClick={handleAddToCart}>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </a>
          </Tooltip>,
        ]}
      >
      </Card>
    </>
  );
};

export default ProductCard;

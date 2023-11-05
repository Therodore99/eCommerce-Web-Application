import React, {useState} from "react";
import StarRating from "react-star-ratings";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { showAverage } from "../../functions - axios/rating";
import _ from "lodash";
import { useDispatch} from 'react-redux';
import { Card, Tabs, Tooltip } from "antd";
import ProductListItems from "./ProductListItems";


const { TabPane } = Tabs;

// this is childrend component of Product page
const SingleProduct = ({ product, sellerName, onStarClick, star }) => {

  const { title, images, _id , brand, seller, reviewer, comment, ratings} = product;
  const [tooltip, setTooltip] = useState('Click to add');
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
              
              flag = false;
            }
          }
          if(flag){
            shoppingCart.push({
              ...product,
              count: parseInt(inputCount),
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

const currentNumInCart = () =>{
  var currentNum = 0;
  let shoppingCart = []
  if(localStorage.getItem('shoppingCart')){
      shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
  }
  for(let i = 0; i < shoppingCart.length; i++){
    if(product.title == shoppingCart[i].title){
      currentNum = shoppingCart[i].count;
    }
  }
  return currentNum;
}

  var showText = "";

  function showComment(text){
    showText = text;
  }

  function moreClick(text){
    showText = text.substr(0,200);
  }

  const commentRatings = () =>{
    if(product && product.ratings && product.ratings.length > 0){
      return(
        <div>
            <div>{showAverage(product)}</div>
             
        </div>
      )
    }else{
      return(
        <div>No rating yet</div>
      )
    }
    
  }
  return (
    <>
      <div className="col-md-5">
        {
          <Card cover={
          <img src={ "/images/"+brand+'.jpeg'} style={{ height: "50%"  }}/>}></Card>
        }

        <Tabs type="card"
        className="mb-5 ">
          <TabPane tab="Comment" key="1">
            {/* {product.comment} */}
            <span className="pull-xs-right">
              {ratings && ratings.map((p) => (
                  <div key={p._id} className="col-md-4">
                    <a>{p.reviewer}:</a>
                    <br></br>

                    {showComment(p.comment)}
                    
                    { p.comment.length > 200 ? (    
                        <button onClick={moreClick(p.comment)}>more</button>                    
                    ):(
                      <a></a>
                    )}
                    <nobr>{showText}</nobr>
                    <nobr>
              </nobr>
                    <span>
                      <StarRating
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="red"
                        rating={p.star}
                        editing={false}
                      />
                    </span>
                   
                  </div>
                ))}
        </span>
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-7">
      <h4 color= '#fff'> {title}</h4>
        {commentRatings()}
        <Card
          actions={[
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add
              </a>
              Current added quantity: {currentNumInCart()}
              </Tooltip>,
              ]}
              >
              <ProductListItems 
              product={product} 
              sellerName={sellerName}
              />
              </Card>
      </div>
    </>
  );
};

export default SingleProduct;

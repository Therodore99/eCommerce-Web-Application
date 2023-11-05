import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product , sellerName}) => {
  const {
    price,
    brand,
    stock,
    seller,
    ratings,
  } = product;

  console.log('rating', ratings)
  function getJsonObject(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();

}
  // const findSeller = (seller._id) =>{
  //   var userList = []; 
  //   console.log(userList);
  //   getJsonObject('dataset_dev/userlist.json',
  //      function(data) {
  //            userList = data;
  //      },
  //      function(xhr) { console.error(xhr); });
  // }


  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right">
          $ {price}
        </span>
      </li>

      <li className="list-group-item">
        Brand{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>


      <li className="list-group-item">
        Stock{" "}
        <span className="label label-default label-pill pull-xs-right">
          {stock}
        </span>
      </li>

      


      <li className="list-group-item">
        Seller{" "}
          <span className="label label-default label-pill pull-xs-right">
            {sellerName}
          </span>
        </li>

    </ul>
  );
};

export default ProductListItems;

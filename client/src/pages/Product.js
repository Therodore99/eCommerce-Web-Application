import React, { useEffect, useState } from "react";
import {getSeller , getProduct, productStar } from "../functions - axios/product";
import { useParams} from 'react-router-dom';
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";


const Product = () => {
  const [product, setProduct] = useState({});

  //star
  const [star, setStar] = useState(0);
  const { user } = useSelector((state) => ({ ...state }));
  //params
  const params = useParams(); 
  const { slug } = params;

  
  //seller name
  const [name, setName] = useState('');

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.reviewer.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
    if (product.seller) {
      console.log('product.seller', product.seller)
      loadSeller();
      
    }
  });

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => {setProduct(res.data)
       //console.log("RES", res.data);});
       console.log("RES", res.data);});
    
  const loadSeller = () =>
      getSeller(product.seller).then((res) => {setName(res.data.firstname +" "+ res.data.lastname)
       console.log("RES Seller", res.data);});

  // const loadCommentor = () => {
  //   getCommentor(product.seller).then((res) => {setName(res.data.firstname +" "+ res.data.lastname)
  //      console.log("RES Seller", res.data);});
  // }

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    //productId, star, authtoken
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

return (
        <div className="container-fluid">
          <div className="row pt-4">
            <SingleProduct
            product={product}
            sellerName={name}
            onStarClick={onStarClick}
            star={star}
          />
          </div>

        </div>
      );
};

export default Product;

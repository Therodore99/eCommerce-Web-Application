import React, { useState, useEffect } from "react";
import {  getAllProductsByCount, fetchProductsByFilter, } from "../functions - axios/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio, Button } from "antd";
//star
import Star from "../components/forms/Star";
import { DollarOutlined, DownSquareOutlined,
    StarOutlined, SearchOutlined, CloseCircleOutlined  } from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  let dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //query
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  //price
  const [ok, setOk] = useState(false);

  //brands
  const [brands, setBrands] = useState([
    "Apple", 'BlackBerry', 'HTC','Huawei','LG', 'Motorola', 'Nokia', 'Samsung', 'Sony', "All"
  ]);

  
  const initialState = {
    loading: false,
    query: text,
    price: [0, 10000],
    star: 'All',
    brand: 'All',
    
  };
  const [values, setValues] = useState(initialState);
  const {price, star, brand} = values;

  //Reset filter fields
  const clearFilters = () => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setValues(initialState)
    //console.log("clear filters", values)
  }

  //default displaying products
  useEffect(() => {
    loadAllProducts();
  }, []);

  
  // 1. load profdusts by DEFAULT
  const loadAllProducts = () => {
    getAllProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  //fetch products by arg
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      console.log("Search ",res.data)
      setProducts(res.data);
    });
  };



  // 2. TEXT
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query:text});
    }, 300); //delay so not to search every character
    return () => clearTimeout(delayed);
  }, [text]);


  // 3. PRICE
  const handleSlider = (value) => {
    console.log('price', value)
    //setPrice(value);
    setValues({...values, price: value})
    setTimeout(() => {
      setOk(!ok);
    }, 300); //delay to backend
  };

  useEffect(() => {
    console.log("ok to request", values );
    //fetchProducts({ price });
  }, [ok]);




  // 5.STAR
  const handleStarClick = (num) => {
    
    console.log('stars', num)
    //setStar(num); //IF THIS CHANGE ACCORDING TO SETVALUES
    setValues({...values, star: num})
    //fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div 
    name='stars'
    className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );


  // 7. BRAND
  // now can only choose one brand 
  const showBrands = () =>
    brands.map((b) => (
      // <Checkbox
      //   value={b}
      //   id={b}
      //   name="brands"
      //   //checked={b === brand}
      //   onChange={handleBrand}
      //   className="pb-1 pl-4 pr-4"
      // >
      //   {b}
      // </Checkbox>
      <Radio
        value={b}
        //name={b}
        name="brand"
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    console.log("brands",e)
    //setBrand(e.target.value);
    setValues({...values, brand: e.target.value})
    
    //fetchProducts({ brand: e.target.value });
  };

  // apply filter button
  const handleSearch = (e) => {
    if (loading) return;
    console.log('text', text)
    setValues({...values, query: text})
    //handleChange({ name: e.target.name, value: e.target.value }); // SEND TO redux
    console.log("Apply filters",values);
    fetchProducts(values)
  };

  //clear filters button
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };


  //add dollar sign for slider
  const formatter = (v) => `$${v}`;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />

          <Menu defaultOpenKeys={["1", "3", "5"]} mode="inline">
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  name= "price"
                  tooltip={{ formatter }}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="10000"
                />
              </div>
            </SubMenu>


            {/* stars */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showStars()}</div>
            </SubMenu>


            {/* brands */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5 pb-3">
                {showBrands()}
              </div>
            </SubMenu>


              {/* Filter button */}

            <div className="pr-5 pb-3">
            <Button 
            // className="btn btn-block" 
            type="primary" 
            icon={<SearchOutlined />}
            onClick={handleSearch}
            >
              Apply Filter
            </Button>
            
           
            <Button 
            //className="btn btn-block btn-danger"  
            danger
            icon={<CloseCircleOutlined />}
            onClick={handleSubmit}
            >
              Clear Filter
            </Button>
            </div>

          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products && products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products && products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

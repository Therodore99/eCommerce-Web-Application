import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions - axios/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "Product title",
  description: "This is the best product",
  price: "",
  // categories: [],
  // category: "",
  // subs: [],
  // shipping: "Yes",
  stock: "",
  images: [],
  // colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Samsung", "Apple", "HTC", "Huawei", "Nokia","LG","Motorola","BlackBerry"],
  // color: "",
  brand: "",
  disabled: "",
  seller:"",
};



const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setValues({...values, seller: user.email})
}, [])

  console.log('create product',user._id)
  const handleSubmit = (e) => {
    
    e.preventDefault();
    createProduct(values)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Phone listing Create</h4>
          )}
          <hr />
          
          {/* {JSON.stringify(values.images)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
             
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;

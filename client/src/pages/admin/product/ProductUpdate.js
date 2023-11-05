import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct,updateProduct } from "../../../functions - axios/product";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from 'react-router-dom';
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  // categories: [],
  // category: "",
  // shipping: "",
  stock: "",
  images: [],
  //colors: ["Black", "Brown", "Silver", "White", "Blue"], //leave for admin to pick
  brands: ["Samsung", "Apple", "HTC", "Huawei", "Nokia","LG","Motorola","BlackBerry"],
  //color: "",
  brand: "",
  disabled: "",
};

const ProductUpdate = () => {

  // state
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  //navigate
  const navigate = useNavigate();
  //params
  const params = useParams(); 
//   console.log(params.slug);
  // router
  const { slug } = params;

  const { user } = useSelector((state) => ({ ...state }));
  

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      console.log("single product", p);
      //pre-populate the produc: from the p received >>> populate to the state
      setValues({ ...values, ...p.data });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //
    setLoading(true);
    updateProduct(slug, values, user.token)
    .then((res) => {
      setLoading(false);
      toast.success(`"${res.data.title}" is updated`);
      navigate("/admin/products");
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
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
            <h4>Product update</h4>
          )}
          {/* {JSON.stringify(values)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;

import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions - axios/category";
import { useParams, useNavigate } from 'react-router-dom';
import CategoryForm from "../../../components/forms/CategoryForm";
const CategoryUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("user token", user.token);
  console.log(params.slug);
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    // console.log(params);
    updateCategory(params.slug, { name }, user.token)
      .then((res) => {
        console.log(res);
       
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        navigate("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update category</h4>
          )}
          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
         
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;

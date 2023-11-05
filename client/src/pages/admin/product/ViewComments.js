import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions - axios/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from 'axios';


const ViewComments = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nowuser,setNowuser]=useState({});
  const [firstname,setFname]=useState("");
  const [lastname,setLname]=useState("");
  const [comments,setComments]=useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  useEffect(()=>{
    var token=localStorage.getItem("token");
    axios({
        url:process.env.REACT_APP_API+"/users/comments",
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        data: {token:token},
      }).then(res=>{
        console.log(res);
        setComments(res.data.comments);
      });
  },[])

  const loadAllProducts =() => {
    setLoading(true);
    //get all products
    getProductsByCount(100, user.token)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    // let answer = window.confirm("Delete?");
    if (window.confirm("Delete?")) {
      console.log("send delete request", slug);
      //remove
      removeProduct(slug, user.token)
        .then((res) => {
          //update products displayed
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  const hidden=e=>{
    var id=e.target.attributes.id.value;
    var reviewer=e.target.attributes.reviewer.value;
    var comment=e.target.attributes.comment.value;
    var bl="Yes";
    axios({
      url:process.env.REACT_APP_API+"/users/comment",
      method: 'PUT',
      headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: {reviewer:reviewer,id:id,bl:bl,comment:comment},
    }).then(res=>{
      toast.success(
        res.data.message
      );
    });
  }

  const show=e=>{
    var id=e.target.attributes.id.value;
    var reviewer=e.target.attributes.reviewer.value;
    var comment=e.target.attributes.comment.value;
    var bl="No";
    axios({
      url:process.env.REACT_APP_API+"/users/comment",
      method: 'PUT',
      headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: {reviewer:reviewer,id:id,bl:bl,comment:comment},
    }).then(res=>{
      toast.success(
        res.data.message
      );
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(firstname!="" && lastname!=""){
      var token=localStorage.getItem("token");
      await axios({
        url:process.env.REACT_APP_API+"/users",
        method: 'PUT',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        data: {token:token,firstname:firstname,lastname:lastname},
      }).then(res=>{
        toast.success(
          res.data.message
        );
        setTimeout(function(){
          window.location.href="/login";
        },3000);
      });
    }else{
      toast.error(
        'First-name and Last-name cannot be empty!'
      );
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h2>View Comments</h2>
          )}
          <div>
            <table className="table table-hover">
              <thead>
                <tr className="active">
                  <td>title</td>
                  <td>comment</td>
                  <td>Options</td>
                </tr>
              </thead>
              <tbody>
              {comments.map(item=>(
                <tr>
                  <td>{item.title}</td>
                  <td>{item.comment}</td>
                  <td>
                    <button onClick={hidden} id={item._id} reviewer={item.reviewer} comment={item.comment}>Hidden</button>
                    <button onClick={show} id={item._id} reviewer={item.reviewer} comment={item.comment}>Show</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComments;

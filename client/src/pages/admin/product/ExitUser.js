import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount, removeProduct } from "../../../functions - axios/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from 'axios';
import { Button, Modal } from 'antd';


const ExitUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nowuser,setNowuser]=useState({});
  const [firstname,setFname]=useState("");
  const [lastname,setLname]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");


  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  useEffect(()=>{
    var token=localStorage.getItem("token");
    axios({
        url:process.env.REACT_APP_API+"/users/token",
        method: 'POST',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        data: {token:token},
      }).then(res=>{
        setFname(res.data.user.firstname);
        setLname(res.data.user.lastname);
        setEmail(res.data.user.email);
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

  const handleOk=async(e)=>{
    const regex = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[\W])(?=.*[\S])^[0-9A-Za-z\S]{8,12}$/g;
    if(regex.test(password)){
      var token=localStorage.getItem("token");
      try{
        await axios({
          url:process.env.REACT_APP_API+"/users/judgmentpassword",
          method: 'POST',
          headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          data: {token:token,password:password},
        }).then(res=>{
          toast.success(
            res.data.message
          );
          setIsModalOpen(true);
          axios({
            url:process.env.REACT_APP_API+"/users",
            method: 'PUT',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            data: {token:token,firstname:firstname,lastname:lastname,email:email},
          }).then(res=>{
            toast.success(
              res.data.message
            );
            setTimeout(function(){
              window.location.href="/login";
            },3000);
          });
        })
      }catch(e){
        toast.error('Incorrect password!');
      }
      
    }else{
      toast.error('The password must contain lowercase letters, uppercase letters, numbers, and symbols!');
    }
    
    await axios({
      url:process.env.REACT_APP_API+"/users",
      method: 'PUT',
      headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: {token:token,firstname:firstname,lastname:lastname,email:email},
    }).then(res=>{
      toast.success(
        res.data.message
      );
      setTimeout(function(){
        window.location.href="/login";
      },3000);
    });
  }

  const handleCancel=async(e)=>{
    setIsModalOpen(false);
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(firstname!="" && lastname!=""){
      setIsModalOpen(true);
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
            <h2>Edit Profile</h2>
          )}
          <div>
          <form onSubmit={handleSubmit}>

          <label>Email:</label>
          <input 
            type="text" 
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Type First Name here'
            autoFocus
          />

            <label>First-Name:</label>
            <input 
                  type="text" 
                  className='form-control'
                  value={firstname}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder='Type First Name here'
                  autoFocus
              />

            <label>Last-Name:</label>
            <input 
                  type="text"
                  value={lastname}
                  onChange={(e) => setLname(e.target.value)}
                  className='form-control'
                  placeholder='Type Last Name here'
                  autoFocus
              />
              <button className='btn btn-raised' disabled={!firstname && !lastname}>
                Submit
              </button>
            </form>
          </div>

          <Modal title="Password Judgment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <label>Confirm password:</label>
          <input 
                  type="password" 
                  className='form-control'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Type Password here'
                  autoFocus
              />
          </Modal>

          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 pb-3"> 
                <AdminProductCard 
                product={product} 
                handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitUser;

import React, { useState, useEffect } from 'react';
import AdminNav from "../../components/nav/AdminNav";
//redux
import { useSelector } from 'react-redux';
//navigate
import { useNavigate,useLocation } from "react-router-dom";
import {toast} from 'react-toastify';
import axios from 'axios';



const AdminDashboard = () => {

  const [password,setPassword]=useState('');
  const [repassword,setRepassword]=useState('');
  
  const navigate = useNavigate();
  const location=useLocation();
  const token=location.search.split("=")[1]

  const {user} = useSelector((state) => ({...state}));
  


  const handleSubmit = async (e) => {
      e.preventDefault();
      var token=localStorage.getItem("token");
      if(token!=null){
          const regex = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[\W])(?=.*[\S])^[0-9A-Za-z\S]{8,12}$/g;
          if(regex.test(repassword)){
                  try{
                      let res=await axios({
                          url:process.env.REACT_APP_API+"/users/changepassword",
                          method: 'POST',
                          headers: {
                              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                          },
                          data: {token:token,password:password,repassword:repassword},
                      }).then(res=>{
                        toast.success(
                          res.data.message
                        );
                        setTimeout(function(){
                          window.location.href="/login";
                        },3000);
                      })
                      
                  }catch(e){
                    toast.error(e.response.data.message);
                  }
          }else{
              toast.error(
                  'The password must hava a minimum of 8 characters including a capital letter, a lower-case letter, a number and a symbol'
              );
          }
      }else{
          toast.error(
            `The token cannot be empty!`
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
          <h2>Change Password</h2>
          <form onSubmit={handleSubmit}>
          <input 
                type="password" 
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Type old Password here'
                autoFocus
            />
            <br/>
            <input 
                type="password" 
                className='form-control'
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                placeholder='Type new Password here'
                autoFocus
            />
            <br/>
            <button className='btn btn-raised' disabled={!password && !repassword}>
                Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

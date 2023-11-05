import React, { useState, useEffect } from 'react';

//toast noti
import {toast} from 'react-toastify';

// antd
import {Button} from 'antd';
import { MailOutlined, GoogleOutlined} from '@ant-design/icons';

//firebase
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
//redux
import { useDispatch,  useSelector } from 'react-redux';

//navigate
import { Link, useNavigate, useLocation } from "react-router-dom";
//axios function
import {loginUser} from '../../functions - axios/auth';

import axios from 'axios';


const Login = () => {
    const [email, setEmail] = useState('xxxxx@gmail.com');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    
   
    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    //console.log(location.state) 
    
    const {user} = useSelector((state) => ({...state}));
    // make sure dont show this page to logged in users 
    // meaning if we access this from home page but we already siggned in (user is not null) >> redirected to home page
    // everytime the user dependency change, do this
    
    useEffect(() => {
      let intended =location.state;
      console.log(location.state)
      if (intended) {
        return;
      } else {
        if (user && user.token) navigate("/");
      }
    }, [user]);


    // redirect users based on role
    const roleBasedRedirect = (res) => {
      let intended = location.state;
      console.log(location.state)
      if (intended) {
        navigate(intended.from);
      } else {
        navigate("/user/history");
      }
    }

    const handleSubmit = async(e) => {
        e.preventDefault(); // prevent the page from reload everytime the form is submitted
        //loading before signed in 
        setLoading(true)

        //signed in
        try {
          if(email!="" && password!=""){
            const regex = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[\W])(?=.*[\S])^[0-9A-Za-z\S]{8,12}$/g;
            if(!regex.test(password)){
                return toast.error(
                    'The password must contain lowercase letters, uppercase letters, numbers, and symbols!'
                );
            }
            let res=await axios({
              url:process.env.REACT_APP_API+"/users/login",
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
              },
              data: {email:email,password:password}
            });
            let data=res.data;
            toast.success(data.message);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                firstname: data.user.firstname,
                lastname: data.user.lastname,
                email: data.user.email,
                token: data.token,
                role: data.user.role,
                _id: data.user._id,
              },
            });
            localStorage.setItem("token",data.token);
            roleBasedRedirect(res);
          }else{
            toast.error("Please enter the complete information!");
          }

          //  const result = await signInWithEmailAndPassword(auth, email, password);
          //  const {user} = result;
          //  const idTokenResult = await user.getIdTokenResult();  
          //  //send token to backend
          //  loginUser(idTokenResult.token)
          //  .then((res) => {
          //    console.log("Create or update user", res);
          //    dispatch({
          //      type: "LOGGED_IN_USER",
          //      payload: {
          //        fname: res.data.fname,
          //        lname: res.data.lname,
          //        email: res.data.email,
          //        token: idTokenResult.token,
          //        role: res.data.role,
          //        _id: res.data._id,
          //      },
          //    });
          //    // redirect users based on role
          //   roleBasedRedirect(res);
            
          //  })
          //  .catch((err)=> console.log(err));    
           
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false)
        }
    };

    // login form
    const loginForm = () => <form onSubmit={handleSubmit}>
       <div className='form-group'>
        <input 
            type='email' 
            className='form-control' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Your email'
            autoFocus
            />
       </div>

       <div className='form-group'>
        <input 
            type='password' 
            className='form-control' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Your password'
            />
       </div>
       
        <br/>
        
        {/* Login button */}
        <Button 
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
        >
        Login with Email/Password
        </Button>
    </form>;
    
    return (
        <div class="container p-5">
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    {loading ? (<h4 className='text-danger'>Loading...</h4>)  : (<h4>Login</h4>)}              
                    {loginForm()}

                    <Link to="/forgot/password" className='float-right text-danger'>
                        Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
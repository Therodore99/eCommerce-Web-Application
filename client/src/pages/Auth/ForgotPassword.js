import React, { useState, useEffect } from 'react';
//toast noti
import {toast} from 'react-toastify';
//firebase
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
//redux
import { useSelector } from 'react-redux';
//navigate
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    
    const auth = getAuth();
    const navigate = useNavigate();

    const {user} = useSelector((state) => ({...state}));

    // make sure dont show this page to logged in users 
    // meaning if we access this from home page but we already siggned in (user is not null) >> redirected to home page
    // everytime the user dependency change, do this
    useEffect(() => {
        // make sure there is an user (user = null can still be counted as true)
        if (user && user.token) navigate("/");
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            let res=await axios({
                url:process.env.REACT_APP_API+"/users/resetpassword",
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
                data: {email:email},
            });
            toast.success(
                `Email is sent to ${email}. Click the link to complete the password reset.`
            );
        }catch(e){
            toast.error(e.response.data.message);
        }
        
        //configure path to redirect users after password reset
        // const config = {
        //     url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
        //     handleCodeInApp: true 
        // };
        // await sendPasswordResetEmail(auth, email, config)
        // .then(() => {
        //     // clear email field after submit
        //     setEmail("");
        //     setLoading(false);
        //     toast.success("Check your email for password reset link");
        // })
        // .catch((error) => {
        //     setLoading(false);
        //     toast.error(error.message);
        //     console.log("ERROR MSG IN FORGOT PASSWORD", error)
        // });
    }

    // center the below
    return <div className='container col-md-6 offset-md-3 p-5' >
        {loading ? <h4 className='text-danger'>Loading...</h4>: <h4>Forgot Password</h4>}
    
        <form onSubmit={handleSubmit}>
            <input 
            type="email" 
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Type your email here'
            autoFocus
            />
            <br/>
            <button className='btn btn-raised' disabled={!email}>
                Submit
            </button>
        </form>
    </div>
}

export default ForgotPassword;
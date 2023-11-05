import React, { useState, useEffect } from 'react';
//toast
import {toast} from 'react-toastify';
//navigate
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
// need this auth otherwise get 'need options error'
import {auth} from '../../firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFname] = useState('');
    const [lastname, setLname] = useState('');
    const navigate = useNavigate();
    const {user} = useSelector((state) => ({...state}));

    // make sure dont show this page to logged in users 
    // meaning if we access this from home page but we already siggned in (user is not null) >> redirected to home page
    // everytime the user dependency change, do this
    useEffect(() => {
        // make sure there is an user (user = null can still be counted as true)
        if (user && user.token) navigate("/");
    }, [user])


    // const auth = getAuth();
    const handleSubmit = async(e) => {
        e.preventDefault(); // prevent the page from reload everytime the form is submitted
        if(firstname!="" && lastname!="" && email!="" && password!=""){
            const regex = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[\W])(?=.*[\S])^[0-9A-Za-z\S]{8,12}$/g;
            if(!regex.test(password)){
                return toast.error(
                    'The password must contain lowercase letters, uppercase letters, numbers, and symbols!'
                );
            }
            try{
                let res=await axios({
                    url:process.env.REACT_APP_API+"/users/signup",
                    method: 'POST',
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                    data: {email:email,password:password,firstname:firstname,lastname:lastname}
                });
                toast.success(
                    `Email is sent to ${email}. Click the link to complete registration.`
                );
                //save user email in local storage setItem(key, value)
                window.localStorage.setItem('emailForRegistration', email);
                //clear stateax
                setEmail('');
            }catch(e){
                toast.error(
                    e.response.data.message
                );
            }
        }else{
            toast.error(
                'Please enter the complete information!'
            );
        }       
    };

    const registerForm = () => <form onSubmit={handleSubmit}>
       
        <input 
        type='text' 
        className='form-control' 
        value={firstname}
        onChange={(e) => setFname(e.target.value)}
        placeholder='Your First-Name'
        autoFocus
        />

        
    <input 
        type='text' 
        className='form-control' 
        value={lastname}
        onChange={(e) => setLname(e.target.value)}
        placeholder='Your Last-Name'
        autoFocus
        />

<input 
        type='email' 
        className='form-control' 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Your Email'
        autoFocus
        />


<input 
        type='password' 
        className='form-control' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Your Password'
        autoFocus
        />


        <br/>
        
        <button type='submit' className='btn btn-raised'>Register</button>
    </form>;
    
    return (
        <div class="container p-5">
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h4>Register</h4>                    
                    {registerForm()}
                </div>
            </div>
        </div>
    );
}

export default Register;
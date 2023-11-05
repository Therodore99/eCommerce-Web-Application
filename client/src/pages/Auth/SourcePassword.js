import React, { useState, useEffect } from 'react';
//toast noti
import {toast} from 'react-toastify';
//firebase
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
//redux
import { useSelector } from 'react-redux';
//navigate
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';


const SourcePassword = () => {
    const [email, setEmail] = useState('');
    const [password,setPassword]=useState('');
    const [repassword,setRepassword]=useState('');

    const [loading, setLoading] = useState(false);
    
    const auth = getAuth();
    const navigate = useNavigate();
    const location=useLocation();
    const token=location.search.split("=")[1]

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
        if(token!=null){
            const regex = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[\W])(?=.*[\S])^[0-9A-Za-z\S]{8,12}$/g;
            if(regex.test(password)){
                if(password==repassword){
                    try{
                        let res=await axios({
                            url:process.env.REACT_APP_API+"/users/resetpassword",
                            method: 'PUT',
                            headers: {
                                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                            },
                            data: {token:token,password:password},
                        });
                        console.log(res);
                        toast.success(
                            res.data.message
                        );
                        window.location.href="/login";
                    }catch(e){
                        toast.error(e.response.data.message);
                    }
                }else{
                    toast.error(
                        'The password must be the same twice!'
                    );
                }
            }else{
                toast.error(
                    'The password must contain lowercase letters, uppercase letters, numbers, and symbols!'
                );
            }
        }else{
            toast.error(
              `The token cannot be empty!`
            );
        }
        
    }

    // center the below
    return <div className='container col-md-6 offset-md-3 p-5' >
        {loading ? <h4 className='text-danger'>Loading...</h4>: <h4>Source Password</h4>}
    
        <form onSubmit={handleSubmit}>
            <input 
                type="password" 
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Type new Password here'
                autoFocus
            />
            <br/>
            <input 
                type="password" 
                className='form-control'
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                placeholder='Type new Re-Password here'
                autoFocus
            />
            <br/>
            <button className='btn btn-raised' disabled={!password && !repassword}>
                Submit
            </button>
        </form>
    </div>
}   

export default SourcePassword;
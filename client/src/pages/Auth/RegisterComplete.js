import React, { useState, useEffect } from 'react';
import {toast} from 'react-toastify';
import { getAuth, signInWithEmailLink, updatePassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
//redux
import { useDispatch,  useSelector } from 'react-redux';
//axios
import {createOrUpdateUser} from '../../functions - axios/auth';


const RegisterComplete = () => {
    const auth = getAuth();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const initialState = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      };

    const [values, setValues] = useState(initialState);
    let { firstname, lastname, email, password } = values;
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    
    //get user state
    const {user} = useSelector((state) => ({...state}));
    
    useEffect(() => {
        setValues({...values, email: window.localStorage.getItem('emailForRegistration')})
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault(); // prevent the page from reload everytime the form is submitted
        // validation notification
        if (!password ||!firstname|| !lastname|| password.length < 8) {
            toast.error('Must fill in all fields');
            return;
        }
    
        try {
            const result = await signInWithEmailLink(auth, email, window.location.href);
            
            if (result.user.emailVerified) {
                // remove user email from local storage
                window.localStorage.removeItem('emailForRegistration');
                // get user id token
                let user = auth.currentUser;
                await updatePassword(user, password); // update the user with password
                const idTokenResult = await user.getIdTokenResult();
                //redux store
                console.log('user', user, 'idToken', idTokenResult);
                //send token to backend
                createOrUpdateUser(values, idTokenResult.token)
                .then((res) => {
                    // console.log(res)
                    dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        firstname: res.data.firstname,
                        lastname: res.data.lastname,
                        email: res.data.email,
                        token: idTokenResult.token,
                        password: res.data.password,
                        _id: res.data._id,
                    },
                    
                    });
                })
                .catch((err)=> console.log(err));    
                // redirect user to home page
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    

    const completeRegistrationForm = () => 
    <form onSubmit={handleSubmit}>

        <input 
            type='text'
            name ="firstname"
            className='form-control' 
            value={values.firstname}
            placeholder='first name'
            onChange={handleChange}
        />


        <input 
            type='text' 
            name ="lastname"
            className='form-control' 
            value={values.lastname}
            placeholder='last name'
            onChange={handleChange}
        />


        <input 
            type='email' 
            name = 'email'
            className='form-control' 
            value={values.email}
            // onChange={handleChange}
            disabled
        />

        
        <input 
            type='password' 
            name ='password'
            className='form-control' 
            value={values.password}
            placeholder='password'
            onChange={handleChange}
            autoFocus
        />

        <button type='submit' className='btn btn-raised'>Complete Registration</button>
    </form>;
    
    return (
        <div class="container p-5">
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h4>Register Complete</h4>                    
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
}

export default RegisterComplete;
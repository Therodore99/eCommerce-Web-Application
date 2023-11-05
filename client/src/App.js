import React, { useEffect, useState, useCallback } from 'react'
import { Routes,  Route, BrowserRouter as Router } from 'react-router-dom';
import { Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// import Auth from './user/Auth';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import 'antd/dist/reset.css';
import RegisterComplete from './pages/Auth/RegisterComplete';
import ForgotPassword from './pages/Auth/ForgotPassword';
import UserPage from './pages/user/UserPage';
import Password from './pages/user/Password';
import UserProfile from './pages/user/UserProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import LoadingToRedirect from './components/routes/LoadingToRedirect';
//admin tasks
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import ExitUser from './pages/admin/product/ExitUser';
import ProductCreate from './pages/admin/product/ProductCreate' 
import AllProducts from './pages/admin/product/AllProducts';
import ViewComments from './pages/admin/product/ViewComments';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import SourcePassword from './pages/Auth/SourcePassword'
//shop page
import Shop from "./pages/Shop";
//Cart page
import Cart from './pages/Cart';
//Item state
import Product from './pages/Product';


//firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch,useSelector } from 'react-redux';
import { currentUser } from './functions - axios/auth';

const App = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  
  //check firebase auth state and update redux
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log('user', user);
        currentUser(idTokenResult.token) 
          .then((res) => {
            dispatch({ // dispatch to redux 
              type: "LOGGED_IN_USER",
              payload: {
              firstname: res.data.firstname,
              lastname: res.data.lastname,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      } 
    });
    return () => unsubscribe();
  }, []);

  let { user } = useSelector((state) => ({ ...state }));
  
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/shop" element={<Shop/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/forgot/sourcepassword" element={<SourcePassword/>} />
        
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />

        <Route  path='/user/history' element={ user? (<UserPage />) : (
          <LoadingToRedirect />
        )} />
        <Route  path='/user/password' element={ user? (<Password  />) : (
          <LoadingToRedirect />
        )} />
        <Route  path='/user/profile' element={ user? (<UserProfile />) : (
         <LoadingToRedirect />
        )} />
        <Route  path='/admin/dashboard' element={ user? (<AdminDashboard />) : (
         <LoadingToRedirect />
        )} />
        <Route  path='/admin/category' element={ user? (<CategoryCreate />) : (
                <LoadingToRedirect />
        )} />
        <Route  path='/admin/category/:slug' element={ user? (<CategoryUpdate />) : (
                <LoadingToRedirect />
        )} />
        <Route  path='/admin/product' element={ user? (<ProductUpdate />) : (
                <LoadingToRedirect />
        )} />

        <Route  path='/admin/edit' element={ user? (<ExitUser />) : (
                <LoadingToRedirect />
        )} />
        <Route  path='/admin/add' element={ user? (<ProductCreate />) : (
                <LoadingToRedirect />
        )} />
        <Route  path='/admin/products' element={ user? (< AllProducts/>) : (
                <LoadingToRedirect />
        )} />

        <Route  path='/admin/view' element={ user? (< ViewComments/>) : (
                <LoadingToRedirect />
        )} />

        <Route  path='/admin/product/:slug' element={ user? (<ProductUpdate />) : (
                <LoadingToRedirect />
        )} />
        
        <Route exact path="/product/:slug" element={<Product />} />
        
      </Routes>
    </>
  );
};

export default App;

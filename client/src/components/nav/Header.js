import React, {useState,useContext } from 'react';
import {AppstoreOutlined, LogoutOutlined, ShoppingOutlined, SettingOutlined, UserOutlined, UserAddOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import { Menu, Badge, Layout } from 'antd';
import {Link} from 'react-router-dom';
//firebase
import { getAuth } from "firebase/auth";
//redux
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
//shop page
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
    //auth context
    const auth = getAuth();

    const [current, setCurrent] = useState('home');
   
    //update redux state
    const dispatch = useDispatch();
    
    //get redux state  const state = useSelector((state) => state)
    // get user from redux state - need to ... to spread out the state
    let { user, cart } = useSelector((state) => ({ ...state }));

    //navigation
    const navigate = useNavigate();

    const onclick = (e) => {
        setCurrent(e.key);
    };

    //old
    const logout = () => {
      if (window.confirm("Log out?")) {
        auth.signOut();
        dispatch({
          type: 'LOGOUT',
          payload: null,
        });
        navigate('/');
      }
      
    }

    return (
      <Layout>
        <div className="text-center bg-light"  style={{ backgroundImage: "url('https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1200&fit=crop&crop=faces')" }} >
        <h1>Old Phone Deals</h1>
      
      </div>
      
        <Menu onClick={onclick} selectedKeys={[current]} mode="horizontal"  >
          <Item key="home" icon={<AppstoreOutlined /> } >
            <Link to="/">Home</Link>
          </Item>

          <Item key="shop" icon={<ShoppingOutlined />}>
            <Link to="/shop">Shop</Link>
          </Item>

          <Item key="cart">
            <Link to="/Cart">
              <Badge count = {cart.length} offset={[10,6]}>
                  Cart
              </Badge>
            </Link>
          </Item>
          
          {!user && (
           <Item key="register" icon={<UserAddOutlined />} className="navbar-nav ml-auto">
            <Link to="/register">Register</Link>
          </Item>
          )} 

           {!user && (
            <Item key="login" icon={<UserOutlined />} className="float-end">
              <Link to="/login">Login</Link>
            </Item>
          )}

          <span className="float-end p-2" > 
            <Search />
          </span>


          {user && (
            <SubMenu 
            icon={<SettingOutlined />} 
            title={user.email && user.email.split('@')[0]} 
            className="navbar-nav ml-auto"
            >
            <Item key="setting:2"><Link to="/admin/dashboard">Dashboard</Link></Item>
            <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
          </SubMenu>
          )}
          
          

        </Menu>
        </Layout>

      );
};

export default Header;
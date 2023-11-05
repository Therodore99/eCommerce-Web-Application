import React, {useState} from "react";
import UserNav from "../../components/nav/UserNav";
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import { getAuth } from "firebase/auth";
import { updatePassword } from "firebase/auth";


const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  
  const handleSubmit =  async(e) => {
    e.preventDefault();
    setLoading(true)
    //send to firebase
    await updatePassword(user,password)
    .then(() => {
      setLoading(false);
      setPassword("")
      toast.success('Password updated')
    })
    .catch((err) => {
      setLoading(false)
      
      toast.error(err.message);
    }); 
  };

  const passwordUpdateForm = () => 
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Your password</label>
      <input 
      type="password" 
      onChange={(event) => setPassword(event.target.value)} 
      className="form-control"
      placeholder="Enter new password"
      disabled={loading}
      value={password}
      />
      <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>Submit</button>
    </div>
  </form>
  return (<div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <UserNav />
      </div>
      <div className="col">
      {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Password Update</h4> }
        {passwordUpdateForm()}
      </div>
    </div>
  </div>
)};

export default Password;

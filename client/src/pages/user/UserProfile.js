import React from "react";
import UserNav from "../../components/nav/UserNav";

const UserProfile= () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <UserNav />
      </div>
      <div className="col">user profile page</div>
    </div>
  </div>
);

export default UserProfile;

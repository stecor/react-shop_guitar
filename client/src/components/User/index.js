import React from 'react';
import UserLayout from '../../hoc/userLayout';
import MyButton from '../utils/button';

const UserDashboard = () => (

    <UserLayout>
        <div>
          <div className="user_nfo_panel">
            <h2>User Information</h2>
            <div>
              <span>name</span>
              <span>lastname</span>
              <span>email</span>
            </div>

            <MyButton
              type="default"
              title = "Edit account info"
              linkTo = "/user/user_profile"
            />
          </div>
          <div className="user_nfo_panel">
            <h2>History Purchases</h2>
            <div className="user_product_block_wrapper">
              history
            </div>
          </div>
        </div>
    </UserLayout>

);

export default UserDashboard;

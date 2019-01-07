import React from 'react';
import MyButton from '../utils/button';

const RegisterLogin = () => {
  return (
      <div className="page_wrapper">
          <div className="container">
            <div className="register_login_container">
              <div className="left">
                <h2>New Customers</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Soluta repudiandae, eveniet laborum doloribus, vel omnis sunt.
                Quaerat esse, aliquam minima vero sequi perferendis iure
                voluptates nobis iusto. Possimus, ipsum? Magni.</p>
                <MyButton
                    type="default"
                    title="Create an account"
                    linkTo = "/register"
                    addStyles={{
                      margin:'10px 0 0 0'
                    }}
                />
              </div>

              <div className="right">
                  <h2>Registered Customers</h2>
                  <p>If you have an account, please Log in.</p>
                  LOGIN
              </div>
            </div>
          </div>
      </div>
)};

export default RegisterLogin;

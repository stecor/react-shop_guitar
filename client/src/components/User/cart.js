import React, { PureComponent } from 'react';
import UserLayout from '../../hoc/userLayout';
import { getCartItems } from '../../actions/user_actions';

import { connect } from 'react-redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

class UseCart extends PureComponent {

  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false,
  }

  componentDidMount() {
    let cartItem =[];
    let user = this.props.user;

    if(user.userData.cart){
      if(user.userData.cart.length > 0){
        user.userData.cart.forEach(item=>{
          cartItem.push(item.id)
        });
        this.props.dispatch(getCartItems(cartItem,user.userData.cart))
                    .then(() =>{
                      
                    })
      }
    }
  }

  render() {
    return (
      <UserLayout>
            <div>
                cart
            </div>
      </UserLayout>
    );
  }

}

const mapStateToProps = (state) =>{
  return{
      user: state.user
  }
}

export default connect(mapStateToProps)(UseCart);

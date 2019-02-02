import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Swal from 'sweetalert';

import MyButton from './button';

import { addToCart } from '../../actions/user_actions';


class Card extends Component {

 renderCardImage(images) {
    if(images.length > 0){
      return images[0].url
    }else{
      return '/images/not-available.jpg'
    }
  }

  render() {

    const props = this.props;

    return (
      <div className={`card_item_wrapper ${props.grid}`}>
          <Link to={`/product_detail/${props._id}`}>
            <div className="image"
                  style={{
                    background:`url(${this.renderCardImage(props.images)}) no-repeat`
                  }}>
            </div>
          </Link>

          <div className="action_container">
            <div className="tags">
              <div className="brand">{props.brand.name}</div>
              <Link to={`/product_detail/${props._id}`}>
                <div className="name">{props.name}</div>
              </Link>
              <div className="price">${props.price}</div>
            </div>
          {
            props.grid?
              <div className="description">
                <p>{props.description}</p>
              </div>
            :null
          }
          <div className="actions">
            <div className="button_wrapp">
              <MyButton
                  type="default"
                  altClass="card_link"
                  title="View product"
                  linkTo={`/product_detail/${props._id}`}
                  addStyles={{
                    margin:'10px 0 0 0'
                  }}
              />
            </div>
            <div className="button_wrapp">
              <MyButton
                type="bag_link"
                runAction={()=>{
                  props.user.userData.isAuth ?
                      this.props.dispatch(addToCart(props._id))
                  :    Swal({
                    title: "Please login!",
                    text: "You cannot add products to the cart!",
                    icon: "error",
                    button: "Back",
                  })
                }}
              />
            </div>
          </div>
          </div>
      </div>

    );
  }

}

const mapStateToProps = (state) =>{
   return{
     user: state.user
   }
}

export default connect(mapStateToProps)(Card);

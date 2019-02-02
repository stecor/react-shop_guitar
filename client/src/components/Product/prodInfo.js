import React from 'react';
import { connect } from 'react-redux';

import MyButton from '../utils/button';
import Swal from 'sweetalert';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProdInfo = (props) => {

    const showProdTags =(detail) => (

            <div className="product_tags">
              {
                detail.shipping ?
                <div className="tag">
                  <div>
                    <FontAwesomeIcon icon={faTruck}/>
                  </div>
                  <div className="tag_text">
                      <div>Free Shipping</div>
                      <div>And return</div>
                  </div>
                </div>

                :null
              }
              {
                detail.available ?

                    <div className="tag">
                      <div>
                        <FontAwesomeIcon icon={faCheck}/>
                      </div>
                      <div className="tag_text">
                          <div>Available</div>
                          <div>in Store</div>
                      </div>
                    </div>

                :

                <div className="tag">
                  <div>
                    <FontAwesomeIcon icon={faTimes}/>
                  </div>
                  <div className="tag_text">
                      <div>Not Available</div>
                      <div>Preorder Only</div>
                  </div>
                </div>

              }
            </div>
      )

    const showProdActions = (detail) =>(

          <div className="product_actions">
            <div className="price">$ { detail.price }</div>
            <div className="cart">
              <MyButton
                  type="add_to_cart_link"
                  runAction = {()=>{
                     props.user.userData.isAuth ?
                          props.addToCart(detail._id)
                     :Swal({
                        title: "Please login!",
                        text: "You cannot add products to the cart!",
                        icon: "error",
                        button: "Back",
                      })
                  }}
                />
            </div>
          </div>

    )

    const showProSpecifications =() =>(
      <div className="product_specifications">
          <h2>Specs</h2>
            <div className="item">
              <strong>Frets: </strong> {detail.frets}
            </div>
            <div className="item">
              <strong>Wood: </strong> {detail.wood.name}
            </div>
      </div>
    )

    const detail = props.detail;

  return(
  <div>
      <h2>{detail.brand.name} {detail.name}</h2>
      <p>
        {detail.description}
      </p>
      { showProdTags(detail) }
      { showProdActions(detail) }
      { showProSpecifications(detail) }
  </div>
)};

const mapStateToProps = (state) =>{

   return{
     user: state.user
   }
}

export default connect(mapStateToProps)(ProdInfo);

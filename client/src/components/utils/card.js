import React, { Component } from 'react';
import MyButton from './button'


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
          <div className="image"
                style={{
                  background:`url(${this.renderCardImage(props.images)}) no-repeat`
                }}>
          </div>
          <div className="action_container">
            <div className="tags">
              <div className="brand">{props.brand.name}</div>
              <div className="name">{props.name}</div>
              <div className="price">${props.price}</div>
            </div>
          </div>
          {
            props.grid?
              <div className="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe fugiat officia ratione odio praesentium amet vero iste, quidem atque eum adipisci itaque nostrum iure laboriosam doloribus numquam, odit repellat quisquam.
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
                  console.log('added to cart');
                }}
              />
            </div>
          </div>
      </div>

    );
  }

}

export default Card;

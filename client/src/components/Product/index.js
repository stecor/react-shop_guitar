import React, { Component } from 'react';

import PageTop from '../utils/page_top';
import { getProductDetail, clearProductDetail } from '../../actions/products_actions';
import ProdInfo from './prodInfo';
import ProdImg from './prodImg';

import { connect } from 'react-redux';


class ProductDetail extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id))
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail())
  }

  render() {

    return (
      <div>
          <PageTop title="product detail"/>
          <div className="container">
            {
              this.props.products.prodDetail?
                <div className="product_detail_wrapper">
                  <div className="left">
                    <div style={{width:'500px'}}>
                        <ProdImg
                          detail={this.props.products.prodDetail}

                          />
                    </div>
                  </div>
                  <div className="right">
                    <ProdInfo
                        addToCart ={(id) => this.addToCartHandler(id)}
                        detail = {this.props.products.prodDetail}
                      />
                  </div>
                </div>

              :"Loading"
            }
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    products : state.products
  }
}

export default connect(mapStateToProps)(ProductDetail);

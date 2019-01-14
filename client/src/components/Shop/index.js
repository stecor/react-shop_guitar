import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import { getBrands, getWoods } from '../../actions/products_actions'
import CollapseCheckbox from '../utils/collapseCheckbox';
import { frets } from '../utils/Form/fixed_categories';

import { connect }  from 'react-redux';

class Shop extends Component {

  state={
    grid:'',
    limit: 6,
    skip:0,
    filters:{
      brand:[],
      frets:[],
      wood:[],
      price:[],
    }
  }

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());
  }

  handleFilters = (filters,category) =>{
      const newFilters = {...this.state.filters}
      newFilters[category]=filters;
      this.setState({
        filters: newFilters
      })
  }

  render() {
    console.log(this.state.filters);
  const products = this.props.products;


    return (
      <div>
        <PageTop
          title = "Browse Products"
        />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                  initState ={true}
                  title="Brands"
                  list={products.brands}
                  handleFilters={(filters) => this.handleFilters(filters,'brand')}
                />
              <CollapseCheckbox
                  initState ={false}
                  title="Frets"
                  list={frets}
                  handleFilters={(filters) => this.handleFilters(filters,'frets')}
                />
                <CollapseCheckbox
                    initState ={false}
                    title="Woods"
                    list={products.woods}
                    handleFilters={(filters) => this.handleFilters(filters,'wood')}
                  />


            </div>
            <div className="right">
             right
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) =>{

  return{
    products: state.products
  }
}

export default connect(mapStateToProps)(Shop);

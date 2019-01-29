import React, { Component } from 'react';

import FormField from '../../utils/Form/formfield';
import { update, generateData, IsformValid, resetFields } from '../../utils/Form/formActions';
import { getBrands, addBrand, clearBrand } from '../../../actions/products_actions';

import { connect } from 'react-redux';

class ManageBrands extends Component {

  state ={
    formError:false,
    formSuccess:false,
    formdata:{
      name:{
        element:'input',
        value: '',
        config:{
          label: 'Brand Name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter the Brand'
        },
        validation:{
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showlabel:false
      },
    }
  }

  showCategoryItems = () =>(
    this.props.products.brands?
        this.props.products.brands.map((item)=>(
          <div className="category_item" key={item._id}>
          {item.name}
          </div>
        ))
    :null
  )

  updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'brands');
        this.setState({
          formError: false,
          formdata: newFormdata,
        })
    }

  resetFieldsHandler = () =>{

    const newFormdata = resetFields(this.state.formdata,'brands');

    this.setState({
      formdata: newFormdata,
      formSuccess: true
    });

    setTimeout(()=>{
      this.setState({
        formSuccess: false
      }, () => {
        this.props.dispatch(clearBrand())
      })
    },3000)
  }

  submitForm = (event) => {

        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata,'brands');
        let formIsValid =  IsformValid(this.state.formdata,'brands');
        let existingBrands = this.props.products.brands;


        if(formIsValid){

            this.props.dispatch(addBrand(dataToSubmit,existingBrands))
                .then(response=>{
                        if(response.payload.success){
                          this.resetFieldsHandler();
                        }else{
                          this.setState({
                            formError:true
                          })
                        }
                })

        }else{
            this.setState({
              formError : true
            })
        }
    }



  componentDidMount() {
    this.props.dispatch(getBrands());
  }



  render() {

    return (
      <div className="admin_category_wrapper">
          <h2>Brands</h2>
          <div className="admin_two_column">
            <div className="left">
              <div className="brands_container">
              {this.showCategoryItems()}
              </div>
            </div>
            <div className="right">
                <form onSubmit={(event)=>this.submitForm(event)}>

                    <FormField
                        id={'name'}
                        formdata={this.state.formdata.name}
                        change={(element)=> this.updateForm(element)}
                    />
                    {
                      this.state.formSuccess?
                        <div className="form_success">
                          Success
                        </div>
                      :null
                    }
                    {
                      this.state.formError?
                        <div className="error_label">
                            Please check your data
                        </div>
                        :null
                    }

                      <button  onClick={(event)=>this.submitForm(event)}>
                        Add Brand
                      </button>

                </form>
            </div>

          </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    products : state.products
  }
}

export default connect(mapStateToProps)(ManageBrands);

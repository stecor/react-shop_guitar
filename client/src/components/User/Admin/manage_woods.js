import React, { Component } from 'react';

import FormField from '../../utils/Form/formfield';
import { update, generateData, IsformValid, resetFields } from '../../utils/Form/formActions';
import { getWoods, addWood, clearWood } from '../../../actions/products_actions';

import { connect } from 'react-redux';

class ManageWoods extends Component {

  state ={
    formError:false,
    formSuccess:false,
    formdata:{
      name:{
        element:'input',
        value: '',
        config:{
          label: 'Wood Name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter the Wood'
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
    this.props.products.woods?
        this.props.products.woods.map((item)=>(
          <div className="category_item" key={item._id}>
          {item.name}
          </div>
        ))
    :null
  )

  updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'woods');
        this.setState({
          formError: false,
          formdata: newFormdata,
        })
    }


    resetFieldsHandler = () =>{

      const newFormdata = resetFields(this.state.formdata,'woods');

      this.setState({
        formdata: newFormdata,
        formSuccess: true
      });

      setTimeout(()=>{
        this.setState({
          formSuccess: false
        }, () => {
          this.props.dispatch(clearWood())
        })
      },3000)

    }


    submitForm = (event) => {

          event.preventDefault();

          let dataToSubmit = generateData(this.state.formdata,'woods');
          let formIsValid =  IsformValid(this.state.formdata,'woods');
          let existingWoods = this.props.products.woods;


          if(formIsValid){

              this.props.dispatch(addWood(dataToSubmit, existingWoods))
                          .then(response=>{
                              if(response.payload.success){
                                this.resetFieldsHandler();
                              }else {
                                this.setState({formError:true})
                              }
                          })

          }else{
              this.setState({
                formError : true
              })
          }
      }



    componentDidMount() {
      this.props.dispatch(getWoods());
    }


  render() {
    return (
      <div className="admin_category_wrapper">
          <h2>Woods</h2>
          <div className="admin_two_column">
            <div className="left">
              <div className="woods_container">
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
                    Add Wood
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
    products: state.products
  }
}

export default connect(mapStateToProps)(ManageWoods);


// validate function

export const validate = (element, formdata=[]) =>{

  let error = [true,''];

  if (element.validation.email){

    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message =`${!valid? 'Must be a valid email': null}`;
    error = !valid? [valid,message] : error;

  }

  if(element.validation.confirm){

    const valid = element.value.trim() === formdata[element.validation.confirm].value;
    //console.log(valid);
    const message =`${!valid? 'Password do not match': null}`;
    error = !valid? [valid,message] : error;
  }

  if (element.validation.required){

    const valid = element.value.trim() !== '';
    //console.log(valid);
    const message =`${!valid? 'This field is required': null}`;
    error = !valid? [valid,message] : error;

  }

  return error
}


// Update formdata function

export const update = (element,formdata, formName) =>{

    const newFormdata = {
      ...formdata
    }

    const newElement ={
      ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;

    if(element.blur){
      let validData = validate(newElement, formdata);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched=element.blur;
    newFormdata[element.id]= newElement;

    return newFormdata;
}


// generateData to submit function

export const generateData = (formdata, formName) =>{

  let dataToSubmit = {};

  for(let key in formdata){

    if(key!== "confirmPassword"){
        dataToSubmit[key] = formdata[key].value;
    }
  }

  return dataToSubmit;
}


export const IsformValid = (formdata, formName) =>{

  let formIsValid = true;

      for(let key in formdata){
        formIsValid = formdata[key].valid && formIsValid;
      }
      return formIsValid;
}

import axios from 'axios';
import { LOGIN_USER,
         REGISTER_USER,
         AUTH_USER,
         LOGOUT_USER,
         ADD_TO_CART_USER,
         REMOVE_CART_ITEM_USER,
         GET_CART_ITEMS_USER } from './types';

import { USER_SERVER, PRODUCT_SERVER } from '../components/utils/misc';



//Register function
export function registerUser(dataToSubmit){
  const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
                  .then(response => response.data)

      return{
        type: REGISTER_USER,
        payload: request
      }
}

//Login function
export function loginUser(dataToSubmit){

  const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                  .then(response => response.data)

      return{
        type: LOGIN_USER,
        payload: request
      }
}

// Authentication function
export function auth(){
  const request = axios.get(`${USER_SERVER}/auth`)
                    .then(response => response.data);

      return{
        type: AUTH_USER,
        payload: request
      }
}

// logout function
export function logoutUser(){
  const request = axios.get(`${USER_SERVER}/logout`)
                    .then(response => response.data);

      return{
        type: LOGOUT_USER,
        payload: request
      }
}


// Add to Cart function
export function addToCart(id){

  const request = axios.post(`${USER_SERVER}/addToCart?productId=${id}`)
                      .then(response => response.data);

  return {
    type: ADD_TO_CART_USER,
    payload: request
  }
}


export function getCartItems(cartItems, userCart){

    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
                    .then(response =>{

                      userCart.forEach(item =>{
                        response.data.forEach((k,i) =>{
                          if(item.id === k._id){
                            response.data[i].quantity = item.quantity
                          }
                        })
                      })
                      return response.data;
                    })

   return{
     type: GET_CART_ITEMS_USER,
     payload: request
   }
}

export function removeCartItem(id){

    const request = axios.get(`${USER_SERVER}/removeFromCart?_id=${id}`)
                      .then(response =>{
                        response.data.cart.forEach((item)=>{
                          response.data.cartDetail.forEach((k,i)=>{

                            if(item.id === k._id){
                              response.data.cartDetail[i].quantity = item.quantity
                            }

                          })
                        })
                        return response.data;
                      })
    return{
      type: REMOVE_CART_ITEM_USER,
      payload: request
    }

}

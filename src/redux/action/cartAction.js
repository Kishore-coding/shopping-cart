import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";


export const addToCart=(product)=>(dispatch,getState)=>{
    const cartItems=getState().cart.cartItems.slice();
    console.log(cartItems)
    let alreadyExists;
    cartItems.forEach((x)=> {
        if(x._id===product._id){ //here product._id is the current product the user add to cart
            alreadyExists=true;//x._id the product in cartitems
            x.count++;
        }
    })
    if(!alreadyExists){
        cartItems.push({...product,count:1})
    }
    dispatch({
        type:ADD_TO_CART,
        payload:{cartItems}
    })
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
}

export const removeFromCart=(product)=>(dispatch,getState)=>{
    const cartItems=getState().cart.cartItems.slice().filter(x=> x._id!==product._id)

    dispatch({
        type:REMOVE_FROM_CART,
        payload:{cartItems}
    })
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
}
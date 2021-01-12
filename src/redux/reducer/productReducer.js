import { FETCH_PRODUCTS, FILTER_PRODUCT_BY_SIZE, FILTER_PRODUCT_BY_PRICE } from "../types";



export const productReducer=(state={}, action)=>{
    switch(action.type){
        case FETCH_PRODUCTS:
            return {
                
                items:action.payload,//here items is the products[items=products]
                filteredItems:action.payload
            }
        case FILTER_PRODUCT_BY_SIZE:
            return{
                ...state,
                filteredItems:action.payload.items,
                size:action.payload.size
            }
        case FILTER_PRODUCT_BY_PRICE:
            return{
                ...state,
                filteredItems:action.payload.items,
                sort:action.payload.sort
            }
        default:
            return state;
    }
}
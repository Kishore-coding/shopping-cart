import {createStore,combineReducers,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducer/cartReducer";
import { orderReducer } from "./reducer/orderReducer";
import { productReducer } from "./reducer/productReducer";


const initialState={};
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose

const store=createStore(
    combineReducers({
        products:productReducer,
        cart:cartReducer,
        order:orderReducer
    }),
     initialState,
     composeEnhancer(applyMiddleware(thunk))
    );

export default store;
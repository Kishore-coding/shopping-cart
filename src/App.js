import React, { Component } from 'react'
import "./index.css"
//import data from "./data.json"
import Products from './components/Products'
import Filter from './components/Filter'
import Cart from './components/Cart'
import {Provider} from "react-redux"
import store from "./redux/store"

 class App extends Component {
   /*constructor(){
     super()
     this.state={
       
       cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
     }
   }

   createOrder=(order)=>{
      alert(`your are available ${order.name}`)
   }

   removeFromCart=(product)=>{
    const cartItems= this.state.cartItems.slice();
    this.setState({
      cartItems:cartItems.filter(x => x._id !== product._id)
      
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x => x._id !== product._id)));
    console.log(cartItems)
   }

   addToCart=(product)=>{
    const cartItems= this.state.cartItems.slice();
    let alreadyInCart;
    cartItems.forEach((item)=>{
      if(item._id === product._id){
         item.count++;
         alreadyInCart=true;
         console.log(item.count)
         }
       });

       if(!alreadyInCart){
         cartItems.push({...product, count:1})
         console.log(cartItems )
       }

       this.setState({ cartItems});
       //when we refresh the page our card items are disapperared so we using below code
       localStorage.setItem("cartItems", JSON.stringify(cartItems));//since cartItems is a object we stringify it
      }*/
/*
   filterProducts=(e)=>{
      console.log(e.target.value)
      if(e.target.value === ""){
        this.setState({
          size:e.target.value,
          products:data.products
        })
      }
      else{
        this.setState({
          size:e.target.value,
          products:data.products.filter(product=>
              product.availableSizes.indexOf(e.target.value)>=0
          )
        })
      }
   }
   sortProducts=(e)=>{
     const sort=e.target.value
    console.log(e.target.value)
    this.setState((state)=>({
        sort:sort,
        products:this.state.products.slice().sort((a,b)=>(
          sort ==="lowest" ? ((a.price>b.price)? 1:-1):
          sort ==="highest" ? ((a.price>b.price)?- 1:1):
          ((a._id >b._id ) ? 1:-1)

        ))
    }))
   }

   */
   

  render() {
    return (
      <Provider store={store}>
        <div className="div-container">
        <header>
         <h4 className="header">Cherry Shopping Cart</h4>
        </header>
        <main>
          <div className="main-container">
                <div className="main">
                   {/* <Filter 
                    count={this.state.products.length} 
                     size={this.state.size} sort={this.state.sort}
                     filterProducts={this.filterProducts}
                     sortProducts={this.sortProducts}
                   />*/}
                   <Filter/>
                   { /*<Products
                     products={this.state.products} 
                   addToCart={this.addToCart} />*/}
                   <Products/>                   
                   
                </div>

                <div className="sidebar">
                   {/* <Cart cartItems={this.state.cartItems}
                    removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder} />*/}
                  <Cart />
                </div>
            </div>
        </main>
        <footer>
            All rights reserved
        </footer>
  </div>
  </Provider>

    )
  }
}

export default App

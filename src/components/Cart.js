import React, { Component } from 'react'
import { connect } from 'react-redux';
import {removeFromCart} from "../redux/action/cartAction";
import {createOrder,clearOrder} from "../redux/action/orderAction"
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom"


class Cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             showCheckOut:false,
             email:"",
             name:"",
             address:"",
             phoneNumber:""
        }
    }

    handleInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    createOrder=(e)=>{
        e.preventDefault();
        const order={
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            phoneNumber:this.state.phoneNumber,
            cartItems:this.props.cartItems,
            total:this.props.cartItems.reduce((a,c)=> a + c.price*c.count, 0)
        }
        this.props.createOrder(order);
    }
    closeModal=()=>{
        this.props.clearOrder();
    }
    
    render() {
        const {cartItems,order}=this.props;
        return (
            <div>
                {
                    cartItems.length===0 ? (
                    <div className="cart cart-header">Your Cart is empty</div> 
                    ):
                    (
                    <div className="cart cart-header">
                        You have {cartItems.length} item in your Cart
                    </div>
                    )
                }

                {/* final step for the order conformation*/}
                {
                    order && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}>
                                    x
                                </button>
                                <div className="order-details">
                                    <h3 className="success-message">
                                        Your order has been placed successfully
                                    </h3>
                                    <h2 className="order-id">Order Id: {order._id}</h2>

                                    <ul>
                                        
                                        <li>
                                            <div>- Name:</div>
                                            <div>{order.name}</div>
                                        </li>
                                        <li>
                                            <div>- Email:</div>
                                            <div>{order.email}</div>
                                        </li>
                                        <li>
                                            <div>- Address:</div>
                                            <div>{order.address}</div>
                                        </li>
                                        <li>
                                            <div>- Total:</div>
                                            <div>&#8377;{order.total}</div>
                                        </li>
                                        <li>
                                            <div>- Cart Items:</div>
                                            <div>
                                                {order.cartItems.map((x)=>(
                                                    <div>
                                                        {x.count} {" x "} {x.title} 
                                                    </div>
                                                ))}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            
                <div className="cart">
                    <ul className="cart-items">
                        {cartItems.map(item=>(
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}/>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                    &#8377; {item.price} x {item.count} {" "}
                                        <button className="button" id="remove" onClick={()=>this.props.removeFromCart(item)}>
                                            Remove
                                        </button>
                                    </div> 
                                    
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
               
                    
                {
                    cartItems.length>0 && (
                        <div>
                        <div className="cart">
                            <div className="total">
                                <div>
                                Total: { " "}
                                 &#8377;
                                {
                                    cartItems.reduce((a,c)=> a+(c.price*c.count),0)
                                }
                                </div>
                                <button  onClick={()=>{this.setState({showCheckOut:true})}}  className="button primary">
                                     Proceed
                                </button>
                            </div>
                        </div>
                        

                        {this.state.showCheckOut && (
                           
                            <div className="cart">
                           
                                <form onSubmit={this.createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Email</label>
                                            <input type="email" name="email" required onChange={this.handleInput}/>
                                        </li>
                                        <li>
                                            <label>Phone Number</label>
                                            <input type="tel" name="phoneNumber" required onChange={this.handleInput}/>
                                        </li>

                                        <li>
                                            <label>Name</label>
                                            <input type="text" name="name" required onChange={this.handleInput}/>
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input type="text" name="address" required onChange={this.handleInput}/>
                                        </li>
                                        <li>
                                            <button type="submit" className="button primary">
                                                Checkout
                                            </button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        )}
                        </div>
                        )
                    }
                
            </div>
            
        )
    }
}
const mapStateToProps=(state)=>({
    cartItems:state.cart.cartItems,
    order:state.order.order
})

export default connect(mapStateToProps,{removeFromCart,createOrder,clearOrder})(Cart) 

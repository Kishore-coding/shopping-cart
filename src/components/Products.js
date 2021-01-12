import React, { Component } from 'react'
import {fetchProducts} from "../redux/action/productActions";
import {addToCart} from "../redux/action/cartAction"
import {connect} from "react-redux";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom"

class Products extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product:null
        }
    }
    

    componentDidMount(){
        this.props.fetchProducts();
    }

    openModal=(product)=>{
        this.setState({
            product:product
        })
    }

    closeModal=()=>{
        this.setState({
            product:null
        })
    }
    
    render() {
        const {product}=this.state;
        return (
            <div >
                {
                    !this.props.products ? <div>Loading...</div> : (
                    <ul className="products">
                        {this.props.products.map(product=>
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" + product._id} onClick={()=>this.openModal(product)}>
                                        <img src={product.image} alt={product.title}/>
                                        <p>{product.title}</p>
                                    </a>

                                    <div className="product-price">
                                        <div>&#8377;{product.price}</div>
                                        <button onClick={()=> this.props.addToCart(product)} className="button primary">
                                            Add To Cart
                                        </button>
                                    </div>

                                
                                </div>
                            </li>
                    )}
                </ul>
                    )
                }
                
                { product && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>
                                x
                            </button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title}/>
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>
                                    Hanes crew neck  shirt has been an American classic. 
                                    Synonymous with comfort, style and fit, our soft cotton crewneck 
                                    is available in short and long sleeved styles with features that 
                                    include durable double stitching at the hem and sleeves 
                                    and our famous comfort tag-free label and lay flat collar.
                                    </p>
                                    <p>
                                        Available Sizes: {" "}
                                        {product.availableSizes.map((x)=> (
                                            <span> { " " }  
                                                <button className="button">{x}</button>
                                            </span>
                                        ))}
                                    </p>
                                    <div className="product-price">
                                        <div>{product.price}</div>
                                        <button className="button primary" onClick={()=> {
                                            this.props.addToCart(product);
                                            this.closeModal()
                                        }}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                           

                        </Zoom>
                    </Modal>
                )}

            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    products:state.products.filteredItems,
    cartItems:state.cart.cartItems
})

export default connect(mapStateToProps,{fetchProducts,addToCart}) (Products)

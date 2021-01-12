import React, { Component } from 'react'
import {connect} from "react-redux";
import {filterProducts,sortProducts} from "../redux/action/productActions"


class Filter extends Component {
    render() {
        return (
             !this.props.filteredProducts ? (
                 <div>Loading...</div>
             ): (
            <div className="filter">
                <div className="filter-result">
                   Total Products: {this.props.filteredProducts.length} 
                </div>
                <div className="filter-sort">
                    Order {" "}
                    <select value={this.props.sort} 
                        onChange={(e)=>
                            this.props.sortProducts(this.props.filteredProducts, e.target.value)}>

                        <option value="latest">Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </div>
                <div className="filter-size">
                    Filter {" "}
                    <select value={this.props.size} 
                        onChange={(e)=>
                            this.props.filterProducts(this.props.products, e.target.value)}>

                        <option value="ALL">ALL</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>
             )
        )
    }
}
const mapStateToProps=(state)=>({
    size:state.products.size,
    sort:state.products.sort,
    filteredProducts:state.products.filteredItems,
    products:state.products.items
})

export default connect(mapStateToProps,{filterProducts,sortProducts})(Filter)

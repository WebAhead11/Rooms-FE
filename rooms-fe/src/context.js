import React, { Component } from "react";
const ProductContext = React.createContext();

export default class ProductProvider extends Component {
    state = {
        rooms: [],
    }
    // need to change this url in order to work on heroku or other server providers
    roomsDataFromDB = fetch("http://localhost:5000/rooms")
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        this.setState(()=>{
            return {rooms: data};
        })
        console.log(this.state.rooms);
    })
    .catch(err=>console.log(err))

   
    render() {
        return (
            <div>
                 <ProductContext.Provider
                 value={{
                     ...this.state,
                 }}
                 >
                 {this.props.children}
                 </ProductContext.Provider>
            </div>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
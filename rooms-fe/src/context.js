import React, { Component } from "react";
const ProductContext = React.createContext();

export default class ProductProvider extends Component {
    state = {
        rooms: [],
        loggedIn : false,
        user: null,
        modalOpen: false,
    }
    logIn = (username)=>{
        this.setState(()=>{
            return {loggedIn : true , user:username};
        })
    }
    logOut = ()=>{
        this.setState(()=>{
            return {loggedIn : false};
        })
    }
    openModal = () => {
       
        this.setState(() => {
          return {modalOpen: true };
        });
      };
      closeModal = () => {
        this.setState(() => {
          return { modalOpen: false };
        });
      };
     
    // need to change this url in order to work on heroku or other server providers
    roomsDataFromDB = fetch("http://localhost:5000/rooms")
    .then(res=>{
        return res.json();
    })
    .then(data=>{
         this.setState(()=>{
            return {rooms: data};
        })
    //    console.log(this.state.rooms);
    })
    .catch(err=>console.log(err))

    /** clear logged in user */
    
   
    render() {
        return (
            <div>
                 <ProductContext.Provider
                 value={{
                     ...this.state,
                     logIn: this.logIn,
                     logOut: this.logOut,
                     openModal: this.openModal,
                     closeModal: this.closeModal
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
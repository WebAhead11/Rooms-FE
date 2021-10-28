import React from "react";
import { useState } from "react";
const ProductContext = React.createContext();

export default function ProductProvider(props) {
    // state = {
    //     rooms: [],
    //     loggedIn : false,
    //     user: null,
    //     modalOpen: false,
    // }
    const [rooms,setRooms] = useState([]);
    const [loggedIn,setLoggedIn] = useState(false);
    const [user,setUser] = useState(null);
    const [modalOpen,setModalOpen] = useState(false);
    const logIn = (username)=>{
        setLoggedIn(true);
        setUser(username);
        // this.setState(()=>{
        //     return {loggedIn : true , user:username};
        // })
    }
    const logOut = ()=>{
        setLoggedIn(false);
        // this.setState(()=>{
        //     return {loggedIn : false};
        // })
    }
    const openModal = () => {
        setModalOpen(true);
        // this.setState(() => {
        //   return {modalOpen: true };
        // });
      };
      const closeModal = () => {
        setModalOpen(false);
        // this.setState(() => {
        //   return { modalOpen: false };
        // });
      };
     
    // need to change this url in order to work on heroku or other server providers
    const roomsDataFromDB = fetch("http://localhost:5000/rooms")
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        setRooms(data);
        //  this.setState(()=>{
        //     return {rooms: data};
        // })
    //    console.log(this.state.rooms);
    })
    .catch(err=>console.log(err))

    /** clear logged in user */
    
        return (
            <div>
                 <ProductContext.Provider
                 value={{
                     rooms:rooms,
                     loggedIn:loggedIn,
                     user:user,
                     modalOpen:modalOpen,
                     logIn:logIn,
                     logOut: logOut,
                     openModal: openModal,
                     closeModal: closeModal
                 }}
                 >
                 {props.children}
                 </ProductContext.Provider>
            </div>
        )
    
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
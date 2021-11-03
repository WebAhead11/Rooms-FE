import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from 'react-router';
const ProductContext = React.createContext();

export default function ProductProvider(props) {
  
    const [rooms,setRooms] = useState([]);
    const [loggedIn,setLoggedIn] = useState(false);
    const [user,setUser] = useState(null);
    const [modalOpen,setModalOpen] = useState(false);
    const [onlineUsers,setOnlineUsers] = useState([]); 
    const [currentRoom,setCurrentRoom] = useState(null);

    

    useEffect(()=>{
        if(!currentRoom){
            setOnlineUsers([]);
        }
        else
            getUsersFromDB(currentRoom);
    },[currentRoom])

/** updates server which updates DB */
    const joinRoom = (room_id,user,history)=>{

        fetch("http://localhost:5000/join-room", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( {room_id,user} )
    })
    .then(res=>res.json())
    .then(data=>{
        setCurrentRoom(room_id); 
        getUsersFromDB(currentRoom); // updates online users in current room
        history.push("/user-list"); 
    })
    .catch(err=> console.log(err))
    }

    const logIn = (username)=>{
        setLoggedIn(true);
        setUser(username);
    }
    const logOut = ()=>{
        setLoggedIn(false);
    }
    const openModal = () => {
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
      };

       /** helper function that fetches from DB a list of users of a specific room  */
  const getUsersFromDB = (room_id)=>{
     
      if(!room_id)
        return;
    fetch("http://localhost:5000/users-from-room", 
    {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify( {room_id} )
  })
  .then(res=>res.json())
  .then(data => {
    setOnlineUsers(data);
  })
}
     useEffect(()=>{
         // need to change this url in order to work on heroku or other server providers
    fetch("http://localhost:5000/rooms")
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        setRooms(data);
    })
    .catch(err=>console.log(err))
     },[])
   

    /** clear logged in user */
    
        return (
            <div>
                 <ProductContext.Provider
                 value={{
                     rooms:rooms,
                     loggedIn:loggedIn,
                     user:user,
                     modalOpen:modalOpen,
                     onlineUsers:onlineUsers,
                     currentRoom:currentRoom,
                     logIn:logIn,
                     logOut: logOut,
                     openModal: openModal,
                     closeModal: closeModal,
                     setOnlineUsers:setOnlineUsers,
                     setCurrentRoom:setCurrentRoom,
                     getUsersFromDB:getUsersFromDB,
                     joinRoom:joinRoom
                 }}
                 >
                 {props.children}
                 </ProductContext.Provider>
            </div>
        )
    
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
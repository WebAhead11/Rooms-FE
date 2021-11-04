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

    
    /** make states persistent through refresh using local storage */
    useEffect(() => {
  
        setLoggedIn(JSON.parse( window.localStorage.getItem('loggedIn')));
     
        setUser(window.localStorage.getItem('user'));
       
        setOnlineUsers(window.localStorage.getItem('onlineUsers'));
       
        setCurrentRoom(JSON.parse( window.localStorage.getItem('currentRoom')));  
        
      }, []);
    
      useEffect(() => {
        window.localStorage.setItem('loggedIn', loggedIn);
      }, [loggedIn]);
      useEffect(() => {
        window.localStorage.setItem('user', user);
      }, [user]);
      useEffect(() => {
        window.localStorage.setItem('onlineUsers', onlineUsers);
      }, [onlineUsers]);
    

    useEffect(()=>{
        window.localStorage.setItem('currentRoom', JSON.stringify( currentRoom));
        if(!currentRoom){
            setOnlineUsers([]);
        }
        else{
        //    window.localStorage.setItem('user', user);
            getUsersFromDB(currentRoom);
        }
            
    },[currentRoom])

/** updates server which updates DB */
    const joinRoom = (room,user,history)=>{
        const room_id = room.id;
        const room_name = room.name;
        fetch("http://localhost:5000/join-room", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( {room_id,user} )
    })
    .then(res=>res.json())
    .then(data=>{
        setCurrentRoom(room); 
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
       
        // update DB: exit rooms that he is logged in and delete room that he created
        fetch("http://localhost:5000/logout", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( {user} )
    })
    .then(res=>res.json())
    .then(data=>{
       // server sends back a list of up to date rooms
       setRooms(data);
       setLoggedIn(false);
       setUser(null);
       getUsersFromDB(currentRoom);
  //     history.push("/"); 
    })
    .catch(err=> console.log(err))
     }


    
    const openModal = () => {
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
      };

       /** helper function that fetches from DB a list of users of a specific room  */
  const getUsersFromDB = (room)=>{

      if(!room)
        return;
    const room_id = room.id;

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
                     joinRoom:joinRoom,
                     setRooms:setRooms
                 }}
                 >
                 {props.children}
                 </ProductContext.Provider>
            </div>
        )
                }


const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
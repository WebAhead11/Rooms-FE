import React, { useEffect } from 'react'
import Title from './Title'
import { ProductConsumer } from "../context";
import Room from './Room'
export default function RoomList(props) {    
  
    useEffect(()=>{
        props.setCurrentRoom(null);
    },[])
        return (
            <React.Fragment>
            <div className="py-5">
              <div className="container">
                <Title name="Rooms" title="Nearby"></Title>
                <div className="row">
                  <ProductConsumer>
                    {(val) => {
                    
                      const  {currentRoom,onlineUsers,setOnlineUsers,setCurrentRoom,getUsersFromDB,joinRoom} = val;

                        
                      return val.rooms.map((room) => {
                        return (
                          <Room key={room.id} room={room} user={val.user} loggedIn={val.loggedIn} setCurrentRoom={setCurrentRoom} setOnlineUsers={setOnlineUsers} getUsersFromDB={getUsersFromDB} joinRoom={joinRoom}>

                          </Room>
                        );
                      });
                    }}
                  </ProductConsumer>
                </div>
              </div>
            </div>
          </React.Fragment>
        )
    }
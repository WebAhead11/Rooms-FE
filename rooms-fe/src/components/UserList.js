import { ButtonContainer } from './Button';
import React,{ useState } from 'react'
import { ProductConsumer } from "../context";
import User from './User';
import { useHistory } from 'react-router';

export default function UserList () {
  const [refresh, setRefresh] = useState(false); 

  const reloadComponent = ()=>{
    setRefresh(!refresh);
  }
  let history = useHistory();
 const exitRoom = (user,room_id)=>{
   console.log(user, "exiting room number", room_id)
   // remove logged in user from room from db
   fetch("http://localhost:5000/remove-user-from-room", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( {room_id,user} )
    })
    .then(res=>res.json())
    .then(data=>{
        history.push("/");   // go back to home page
    })
    .catch(err=> console.log(err))
  
 }
        return (
            <React.Fragment>
                <ProductConsumer>
                   {(value) => {
                      const  {currentRoom, loggedIn,onlineUsers,setOnlineUsers, user,joinRoom} = value;
                       // check if there is a user logged in and that he exists in that certain room
                        const usernames = onlineUsers.map(obj=>obj.username);
                        const userInRoom = usernames.includes(user);

                      return(
                        <React.Fragment>
                        
                      {
                         value.onlineUsers.map((user) => {
                            return (
                              <User key={user.id} username={user.username} >

                              </User>
                            );
                          })
                        }
                        {
                          loggedIn &&  userInRoom? <ButtonContainer onClick={()=>exitRoom(user,currentRoom)}>Exit Room</ButtonContainer> :  loggedIn &&  !userInRoom  ? 
                          <ButtonContainer onClick={()=>{
                            joinRoom(currentRoom,user,history);
                          }}>Join Room</ButtonContainer> : <React.Fragment></React.Fragment>
                        }
                        
                        </React.Fragment>
                      )
                    }}
                 </ProductConsumer>
             </React.Fragment>
    )
     }

import React, { Component } from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import { ButtonContainer } from './Button';
import { render } from '@testing-library/react';
import UserList from './UserList';
import { useHistory } from 'react-router';
export default function Room (props) {
  let history = useHistory();
  const showUserList = ()=>{
    props.setCurrentRoom(props.room);
    history.push("/user-list"); 
  }
  const deleteRoom = (room_id)=>{
    // update DB
    fetch("http://localhost:5000/delete-room", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify( {room_id} )
  })
  .then(res=>res.json())
  .then(data => {
    props.setRooms(data)
  })
  .catch(err=> console.log(err))
    // update states
    
  }
 
        const user = props.user;
        const loggedIn = props.loggedIn;
        const { id, name, description } = props.room;
        return (
            <RoomWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
             
                <div className='card'>
                  <div className="row">
                    <h3 className="text-blue font-italic mb-0">
                    <button onClick={showUserList}> {name}  </button>
                    </h3>
                    <span>  {description}  </span>
                    {
                      loggedIn ? <ButtonContainer onClick={()=>{
                        props.joinRoom(props.room,user,history)}}>Join Room</ButtonContainer>:
                      <React.Fragment></React.Fragment>
                    }        
                    <ButtonContainer onClick={()=>deleteRoom(id)}>Delete Room</ButtonContainer>
                  </div>
                </div>
              
            </RoomWrapper>
            
        )
    }

const RoomWrapper = styled.div`
  .card{
    border-color:transparent;
    transition:all 1s linear;
  }
  .card-footer{
    background: transparent;
    border-top: transparent;
    transition:all 1s linear;
  }
  &:hover{
    .card{
      border: 0.04rem solid rgba(0,0,0,0.2);
      box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer{
      background:rgba(247,247,247);
    }

  }
  .img-container{
    position: relative;
    overflow:hidden;
  }
  .img-container:hover .card-img-top{
    transform: scale(1.2);
  }
  .cart-btn{
    position: absolute;
    bottom:0;
    right:0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border:none;
    color: var(--mainWhite);
    font-size:1.4rem;
    border-radius:0.5rem 0 0 0;
    transform: translate(100%,100%);
    transition:all 0.5s linear;
  }
  .img-container: hover .cart-btn{
    transform: translate(0,0);
  }
  .cart-btn:hover{
    color:var(--mainBlue);
    cursor:pointer;
  }
`;

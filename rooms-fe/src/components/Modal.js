import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
import CreateRoomForm from './CreateRoomForm'

export default class Modal extends Component {
  saveToDB = (name,description)=>{

    fetch("http://localhost:5000/create-room", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( {username:answer} )
    })
    .then(res=>res.json())
    .then(username=>{
        logIn(username.username);
    })
    .catch(err=> console.log(err))
  }
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { modalOpen, closeModal, user } = value;
          if (!modalOpen) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    <div
                      id="modal"
                      className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
                    >
                      <CreateRoomForm user={user} closeModal={closeModal}></CreateRoomForm>
                     
                    </div>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,0.3);
    display:flex;
    align-items:center;
    justify-content:center;
    #modal{
        background:var(--mainWhite);
    }
`;

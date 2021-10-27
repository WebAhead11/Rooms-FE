import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";

export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { modalOpen, closeModal } = value;
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
                      <h5>Create your dream room</h5>
                      <div class="field">
                        <label htmlFor = "room-name">Room Name:</label>
                        <input name="text" type="text" id = "room-name" placeholder="choose a name for your room"/> 
                      </div>
                      <div class="field">
                        <label htmlFor = "about">Description:</label>
                        <input name="about" type="text" id = "about" placeholder="describe your room"/> 
                      </div>
                      <div className="modal-footer">
                      
                        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      
                      <Link to="/">
                         <button onClick={() => closeModal()} type="button" className="btn btn-primary">Save changes</button>
                      </Link>
                        </div>
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

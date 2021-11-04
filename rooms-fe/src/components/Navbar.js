import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductConsumer } from '../context';


function popup (logIn) {
    let username=  window.prompt("What’s your name?"); 
    fetch("http://localhost:5000/create-user", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( {username} )
    })
    .then(res=>res.json())
    .then(username=>{
        logIn(username.username);
    })
    .catch(err=> console.log(err))
   }


export default function Navbar(){
        return (
                <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                    <Link to='/'>
                        <ButtonContainer yellow>
                            Home
                        </ButtonContainer>
                    </Link>

                    <ProductConsumer>
                    {(val) => {
                        const {loggedIn, logIn, logOut, user} = val;
                        if(loggedIn) {
                            return(
                                <React.Fragment>
                                    <h3>Welcome {user}</h3>
                                    <ButtonContainer onClick={logOut} yellow>
                                        Logout
                                    </ButtonContainer>
                                    <ButtonContainer onClick={ ()=> val.openModal() }>
                                     Create Room
                                    </ButtonContainer>
                                </React.Fragment>
                            );
                        }else{
                            return(<ButtonContainer onClick={()=>popup(logIn)} yellow>
                                Guest Login
                                </ButtonContainer>);
                        }

                     }}
             </ProductConsumer>
                </NavWrapper>
            
        )
    
}

const NavWrapper = styled.nav`
  background:var(--mainBlue);
  .nav-link{
    color:var(--mainWhite) !important;
    font-size:1.3rem;
    text-transform: capitalize;
  }
  display:flex;
  justify-content:space-between;
`;

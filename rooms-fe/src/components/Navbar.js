import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
export default class Navbar extends Component {
    popup = () => {
        let answer=  window.prompt("What’s your name?"); 
        fetch("http://localhost:5000/create-user", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( {username:answer} )
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=> console.log(err))
       }
    render() {
        return (
                <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                    <Link to='/'>
                        <ButtonContainer yellow>
                            Home
                        </ButtonContainer>
                    </Link>

                    <Link to='/'>
                        <ButtonContainer yellow>
                            Create Room
                        </ButtonContainer>
                    </Link>

                    <ButtonContainer onClick={this.popup} yellow>
                            Set Username
                        </ButtonContainer>
                </NavWrapper>
            
        )
    }
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

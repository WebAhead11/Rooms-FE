import React from 'react'
import RoomList from "./RoomList";
import { ProductConsumer } from "../context";

export default function HomePage() {
    return (
        <React.Fragment>
            <ProductConsumer>
                {
                    (value)=>{
                      const {setCurrentRoom} = value;
                      return <RoomList setCurrentRoom={setCurrentRoom}></RoomList>
                    }
                }
            </ProductConsumer>
           
        </React.Fragment>
    )
}

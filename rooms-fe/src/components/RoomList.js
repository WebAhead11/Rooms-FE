import React, { Component } from 'react'
import Title from './Title'
import { ProductConsumer } from "../context";
import Room from './Room'
export default class RoomList extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="py-5">
              <div className="container">
                <Title name="Rooms" title="Nearby"></Title>
                <div className="row">
                  <ProductConsumer>
                    {(val) => {
                      return val.rooms.map((room) => {
                        return (
                          <Room key={room.id} room={room}></Room>
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
}

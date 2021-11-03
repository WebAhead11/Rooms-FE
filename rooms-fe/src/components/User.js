import React from 'react'

export default function User(props) {
    const {username} = props;
    return (
        <div>
           <span>username: {username}</span>
        </div>
    )
}

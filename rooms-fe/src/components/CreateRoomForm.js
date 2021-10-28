import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ProductConsumer } from '../context';

export default function MyForm({user,closeModal}) {
  const [inputs, setInputs] = useState({user});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/create-room", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( inputs )
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
    })
    .catch(err=> console.log(err))
  }

  return (
   
    <form onSubmit={handleSubmit}>
    <h5>Create your dream room</h5>
      <label>Name your Room:
      <input 
        type="text" 
        name="roomName" 
        value={inputs.roomName || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Describe your Room:
      <input 
        type="text" 
        name="description" 
        value={inputs.description || ""} 
        onChange={handleChange}
      />
      </label>
      <label>max people allowed in room:
        <input 
          type="number" 
          name="people" 
          value={inputs.people || ""} 
          onChange={handleChange}
        />
        </label>
        <button onClick={() => closeModal()} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <input type="submit" />
    </form>
            
    
   
  )
}
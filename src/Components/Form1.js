import React, { useState } from 'react'

function Form1({onSendData}) {
    const [name, setName] = useState("")
    const [names, setNames] = useState([])
  return (
    <div>
        <label>Enter Name</label>    
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}  />
        <button onClick={() => setNames([...names, name])}>SAVE</button>  
        <button onClick={() => onSendData(names)}>Send Data To Parent</button>    
    </div>
  )
}

export default Form1
import React, { useState } from 'react'
import List from './List'
import List1 from './List1'

function Form1() {
    const [name, setName] = useState ("")        
    const [names, setNames] = useState([])  
  return (
    <div>Form1
        <label>Enter Name  </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <button onClick={() => setNames([...names, name])}>Submit</button>  
        <List1 nameIn={names}/>  
    </div>

  )
}

export default Form1
import React, { useState } from "react";
import { IformParams } from "../interfaces";



export const MyForm: React.FC<IformParams> = ({id,setId}) => {
  const [tempid, setTempid] = useState<number | string>(1); 
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempid(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setId(tempid); 
    setTempid(""); 
  }

  return (
    <div>
      <h4>Enter the id below</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={tempid}
          min={1}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <p>Confirmed id: {id}</p> 
    </div>
  );
}



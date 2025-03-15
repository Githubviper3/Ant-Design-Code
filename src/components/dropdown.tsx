import React, { useState } from "react";
import { Select } from "antd";
import { Ichoice } from "../interfaces";


export const Dropdown: React.FC<Ichoice> = ({ choice, setChoice }) => {
  const [tempChoice, setTempChoice] = useState<string>(choice);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("You have chosen "+tempChoice)
    setChoice(tempChoice);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Choose your resource:</label>
        <br />
        <select
          name="Resource"
          id="Picker"
          value={tempChoice}
          defaultValue={"products"}
          onChange={(e) => setTempChoice(e.target.value)}
        >
          <option value="products">Products</option>
          <option value="users">Users</option>
          <option value="events">Events</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};


import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const UserForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age, income });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Age" value={age} onChange={(e) => setAge(e.target.value)} type="number" required />
      <TextField label="Income" value={income} onChange={(e) => setIncome(e.target.value)} type="number" required />
      <Button variant="contained" type="submit" style={{ marginTop: "1rem" }}>
        Submit
      </Button>
    </form>
  );
};

export default UserForm;

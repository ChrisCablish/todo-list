import React, { useState } from "react";
import axios from "axios";

function CreateSingleListForm() {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:44396/api/singlelist",
        { name }
      );
      console.log("List created:", response.data);
      // Additional actions on successful post (like clearing the form or showing a success message)
    } catch (error) {
      console.error("There was an error creating the list:", error);
      // Handle errors here (like showing an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        List Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Create List</button>
    </form>
  );
}

export default CreateSingleListForm;

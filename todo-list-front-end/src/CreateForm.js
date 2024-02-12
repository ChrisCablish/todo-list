import React, { useState } from "react";

const CreateForm = ({ handleItemCrud, currentList, singleLists }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const singleList = singleLists.find((list) => list.name === currentList);
    const listId = singleList ? singleList.id : null;
    if (!listId) {
      console.error("List not found");
      return;
    }
    const item = { description: description, singleListIds: [listId] };

    const response = await fetch("https://localhost:44396/api/Item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (response.ok) {
      console.log("Item created");
      handleItemCrud();
    } else {
      console.error("Error creating item");
    }
    setDescription("");
  };

  return (
    <section>
      <h1>Create new list item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></input>
        <button type="submit">Create Item</button>
      </form>
    </section>
  );
};

export default CreateForm;

import React, { useState } from "react";
import styles from "./CreateForm.module.scss";

const CreateForm = ({ handleItemCrud, currentList, singleLists }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

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

    const response = await fetch(`${apiUrl}/Item`, {
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
      <form onSubmit={handleSubmit} className={styles.createSection}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={currentList === "All"}
          placeholder={
            currentList === "All"
              ? "Select a list from list picker"
              : `New ${currentList} Todo...`
          }
          maxLength={30}
          className={styles.createInput}
        ></input>
        <button
          type="submit"
          className={`${styles.createButton} ${
            currentList === "All" ? styles.deactivate : ""
          }`}
          disabled={currentList === "All"}
        >
          Add to {currentList !== "All" ? currentList : "..."}
        </button>
      </form>
    </section>
  );
};

export default CreateForm;

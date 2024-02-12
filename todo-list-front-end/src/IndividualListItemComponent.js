import React, { useState } from "react";
import ellipsis from "./assets/img/ellipsis-svgrepo-com.svg";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./IndividuallistItem.module.scss";

const IndividualListItem = ({
  description,
  id,
  singleLists,
  currentList,
  handleItemCrud,
  isComplete,
}) => {
  const [isChecked, setIsChecked] = useState(isComplete);

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const moveToList = singleLists.filter((list) => list.name !== currentList);

  const deleteHandler = async () => {
    try {
      const response = await fetch(`https://localhost:44396/api/Item/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting item");
      }
      handleItemCrud();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <li className={styles.listItem}>
      <div className={styles.innerContainer}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={false}
          onChange={handleCheckBox}
        ></input>
        <p
          className={`${styles.itemText} ${isChecked ? styles.isChecked : ""}`}
        >
          {description}
        </p>
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            as="div"
            className="icon-button no-arrow"
          >
            <button className={styles.button}>
              <img
                src={ellipsis}
                alt="More options"
                style={{ width: "1.5rem", height: "auto" }}
              />
            </button>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={deleteHandler}>Delete</Dropdown.Item>
            {moveToList.map((list, index) => (
              <Dropdown.Item href="#/action-1" key={index}>
                Move to {list.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </li>
  );
};
export default IndividualListItem;

//if the box is checked, several things need to happen
//1. a PUT request made to api/Item{id}/complete will change the items isComplete from false to true
//2. refetch the global items state to get the list with the updated value, pass it down to IndividualListItem via props
//3. use the value of is isComplete to update the checked attribute of thecheckbox input, tying it to the isComplete state

// Revised Steps for Optimistic UI Updates
// Immediately Update the UI on Checkbox Toggle:

// When a user toggles the checkbox for an item, immediately update the item's UI to reflect the new isComplete status (checked or unchecked). This step is performed before making the API call to ensure the UI feels responsive.
// Make the PUT Request in the Background:

// After the UI has been optimistically updated, make an asynchronous PUT request to the backend API (api/Item/{id}/complete) to update the isComplete status of the item. This request is made in the background, allowing the user to continue interacting with the application without waiting for the request to complete.
// Handle the PUT Request Response:

// If the Request Succeeds: Confirm the optimistic update was correct. No immediate action is required unless additional state management or UI updates are needed that depend on the successful completion of the request.
// If the Request Fails: Revert the UI to its previous state to reflect that the isComplete status update did not succeed. Inform the user of the failure and possibly provide options to retry the action.
// Synchronize the Global State:

// Depending on the application architecture, you might need to synchronize the optimistic UI update with the global application state. This could involve updating a global state management store (like Redux or Context API) with the new isComplete status.
// This step ensures that other parts of the application that rely on this item's state are aware of the change.
// Refetch or Update the Global Items State (Optional):

// After a successful update, you may choose to refetch the entire items list from the backend to ensure the local state is synchronized with the server. This step is optional and might be desirable in applications where data consistency is critical and needs to be guaranteed.
// Alternatively, if the application's architecture supports granular state updates, you could update the global state with the new isComplete status for the specific item, avoiding the need to refetch the entire list.
// Notes on Optimistic UI
// User Experience: Optimistic UI updates can significantly enhance the perceived responsiveness of your application. However, it's essential to manage user expectations and provide clear feedback, especially in cases where an action fails and the UI is reverted.

// Error Handling and Recovery: Robust mechanisms for handling errors and enabling recovery actions (such as retrying a failed update) are critical components of a good optimistic UI implementation.

// Consistency Checks: In applications where data integrity and consistency are paramount, consider implementing periodic consistency checks or refresh mechanisms to ensure the UI remains in sync with the backend state over time.

// By following these revised steps, you can implement a seamless and responsive user experience that optimistically reflects changes in the UI and gracefully handles any discrepancies between the frontend and backend states.

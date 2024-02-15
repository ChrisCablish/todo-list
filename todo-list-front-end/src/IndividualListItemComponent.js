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

  const [isChecked, setIsChecked] = useState(isComplete);

  const updateIsComplete = async (newIsComplete) => {
    try {
      const response = await fetch(
        `https://localhost:44396/api/Item/${id}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newIsComplete),
        }
      );
      if (!response.ok) {
        setIsChecked(!isChecked); //revert optimistic UI if error
        throw new Error("Error updating item complete status");
      }
      handleItemCrud(); //update and re-fetch items
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCheckboxClick = () => {
    const newIsComplete = !isChecked;
    setIsChecked(newIsComplete); //optimistic UI change
    updateIsComplete(newIsComplete); //backend changes
  };

  return (
    <li className={`${styles.listItem} ${styles.oswaldreg}`}>
      <div className={styles.innerContainer}>
        <div className={styles.checkAndText}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isChecked}
            onChange={handleCheckboxClick}
          ></input>
          <p className={`${styles.itemText}`}>{description}</p>
        </div>

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

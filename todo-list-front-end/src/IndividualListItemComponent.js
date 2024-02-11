import React, { useState } from "react";
import ellipsis from "./assets/img/ellipsis-svgrepo-com.svg";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./IndividuallistItem.module.scss";

const IndividualListItem = ({
  description,
  id,
  singleLists,
  currentList,
  onDeleteItem,
}) => {
  const [isChecked, setIsChecked] = useState(false);

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
      onDeleteItem();
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
          checked={isChecked}
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
            <img
              src={ellipsis}
              alt="More options"
              style={{ width: "1.5rem", height: "auto" }}
            />
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

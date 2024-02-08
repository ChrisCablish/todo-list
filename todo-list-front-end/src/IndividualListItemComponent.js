import React from "react";
import ellipse from "./assets/img/ellipsis-horizontal-circle-outline-svgrepo-com.svg";

import Dropdown from "react-bootstrap/Dropdown";
import styles from "./IndividuallistItem.module.scss";

const IndividualListItem = () => {
  const onMenuItemClick = () => {
    console.log("clicked");
    return null;
  };
  return (
    <li className={styles.listItem}>
      <div className={styles.innerContainer}>
        <input type="checkbox" className={styles.checkbox}></input>
        <p className={styles.itemText}>This is a test</p>
        {/* <img src={ellipse} className={styles.ellipse}></img> */}

        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            as="div"
            className="icon-button no-arrow"
          >
            <img
              src={ellipse}
              alt="More options"
              style={{ width: "1.5rem", height: "auto" }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </li>
  );
};

export default IndividualListItem;

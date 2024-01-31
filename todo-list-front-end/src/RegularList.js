import React, { useState } from "react";

function RegularList({ items, currentList, setCurrentList }) {
  const handleListChange = (e) => {
    setCurrentList(e.target.value);
  };

  const getListId = (listName) => {
    return listName === "Daily" ? 2 : 3; // Assuming 2 for Daily, 3 for Weekly
  };

  const filteredItems = items.filter((item) =>
    item.singleListIds.includes(getListId(currentList))
  );

  return (
    <div>
      <div>
        <select onChange={handleListChange} defaultValue={"Daily"}>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>
      </div>
      <h2>{currentList} Items</h2>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default RegularList;

import React from "react";

function RegularList({ items, currentList, setCurrentList, singleLists }) {
  const handleListChange = (e) => {
    setCurrentList(e.target.value);
  };

  const getListId = (listName) => {
    const matchingList = singleLists.find((list) => list.name === listName);
    return matchingList ? matchingList.id : null;
  };

  const filteredItems = items.filter((item) =>
    item.singleListIds.includes(getListId(currentList))
  );
  return (
    <div>
      <div>
        <select onChange={handleListChange} value={currentList}>
          {singleLists.map((list) => (
            <option key={list.id} value={list.name}>
              {list.name}
            </option>
          ))}
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

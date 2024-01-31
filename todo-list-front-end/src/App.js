import List from "./List"; // Make sure the path is correct
import CreateForm from "./CreateForm";
import RegularList from "./RegularList";
import React, { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [currentList, setCurrentList] = useState("Daily");

  const fetchItems = () => {
    fetch("https://localhost:44396/api/Item")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  };

  useEffect(fetchItems, []);

  const handleNewItem = () => {
    fetchItems(); // Refetch items after adding a new one
  };

  return (
    <div>
      {/* <List /> */}
      <CreateForm onNewItem={handleNewItem} currentList={currentList} />
      <RegularList
        items={items}
        setItems={setItems}
        currentList={currentList}
        setCurrentList={setCurrentList}
      />
    </div>
  );
}
export default App;

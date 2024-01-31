import List from "./List"; // Make sure the path is correct
import CreateForm from "./CreateForm";
import RegularList from "./RegularList";
import React, { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [currentList, setCurrentList] = useState("Daily");
  const [singleLists, setSingleLists] = useState([]);

  const fetchItems = () => {
    fetch("https://localhost:44396/api/Item")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  };

  const fetchSingleLists = async () => {
    try {
      const response = await fetch("https://localhost:44396/api/SingleList");
      const data = await response.json();
      setSingleLists(data);
    } catch (error) {
      console.error("Error fetching single lists:", error);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchSingleLists();
  }, []);

  const handleNewItem = () => {
    fetchItems(); // Refetch items after adding a new one
  };

  return (
    <div>
      {/* <List /> */}
      <CreateForm
        onNewItem={handleNewItem}
        currentList={currentList}
        singleLists={singleLists}
      />
      <RegularList
        items={items}
        setItems={setItems}
        currentList={currentList}
        setCurrentList={setCurrentList}
        singleLists={singleLists}
      />
    </div>
  );
}
export default App;

import DraggableList from "./DraggableList";
import CreateForm from "./CreateForm";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchItems = () => {
    fetch(`${apiUrl}/Item`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  };

  const fetchSingleLists = async () => {
    try {
      const response = await fetch(`${apiUrl}/SingleList`);
      const data = await response.json();
      setSingleLists(data);
    } catch (error) {
      console.error("Error fetching single lists:", error);
    }
  };

  const [items, setItems] = useState([]);
  const [currentList, setCurrentList] = useState("All");
  const [singleLists, setSingleLists] = useState([]);

  useEffect(() => {
    fetchItems();
    fetchSingleLists();
  }, []);

  const handleItemCrud = () => {
    fetchItems(); //refetch items
  };

  return (
    <section className="App">
      <div className="appWrapper oswaldreg">
        <CreateForm
          handleItemCrud={handleItemCrud}
          currentList={currentList}
          singleLists={singleLists}
        />
        <DraggableList
          items={items}
          setItems={setItems}
          currentList={currentList}
          setCurrentList={setCurrentList}
          singleLists={singleLists}
          handleItemCrud={handleItemCrud}
        />
      </div>
    </section>
  );
}
export default App;

import DraggableList from "./DraggableList";
import CreateForm from "./CreateForm";
import React, { useState, useEffect } from "react";
import SpinnerComponent from "./SpinnerComponenet";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchItems = () => {
    setIsLoading(true);
    fetch(`${apiUrl}/Item`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  };

  const [items, setItems] = useState([]);
  const [currentList, setCurrentList] = useState("All");
  const [singleLists, setSingleLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(`${apiUrl}/Item`).then((response) => response.json()),
      fetch(`${apiUrl}/SingleList`).then((response) => response.json()),
    ])
      .then(([itemsData, singleListsData]) => {
        setItems(itemsData);
        setSingleLists(singleListsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [apiUrl]); // Include apiUrl in the dependency array if it's not a constant

  const handleItemCrud = () => {
    fetchItems();
    setIsLoading(false);
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
        {isLoading && <SpinnerComponent />}
      </div>
    </section>
  );
}

export default App;

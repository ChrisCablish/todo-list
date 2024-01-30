import React, { useState, useEffect } from "react";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://localhost:44396/api/Item")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.description} {/* Assuming each item has 'content' property */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;

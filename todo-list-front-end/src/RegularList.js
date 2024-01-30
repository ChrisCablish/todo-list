import React, { useState, useEffect } from "react";

function RegularList({ items }) {
  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default RegularList;

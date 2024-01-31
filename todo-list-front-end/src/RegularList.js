import React, { useState, useEffect } from "react";

function RegularList({ items }) {
  // Assuming the ID for the "Daily" list is 1
  const dailyListId = 1;

  const dailyItems = items.filter((item) =>
    item.singleListIds.includes(dailyListId)
  );

  return (
    <div>
      <h2>Daily Items</h2>
      <ul>
        {dailyItems.map((item) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default RegularList;

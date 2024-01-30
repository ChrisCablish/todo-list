import React from "react";
import List from "./List"; // Make sure the path is correct
import CreateForm from "./CreateForm";
import RegularList from "./RegularList";

function App() {
  return (
    <div>
      <List />
      <CreateForm />
      <RegularList />
    </div>
  );
}
export default App;

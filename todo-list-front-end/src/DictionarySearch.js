import React, { useState } from "react";

function DictionarySearch() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  const handleInputChange = (event) => {
    setWord(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://localhost:44396/dictionary/${word}`);
    const data = await response.json();
    setDefinition(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          onChange={handleInputChange}
          placeholder="Enter a word"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <pre>{definition}</pre>
      </div>
    </div>
  );
}

export default DictionarySearch;

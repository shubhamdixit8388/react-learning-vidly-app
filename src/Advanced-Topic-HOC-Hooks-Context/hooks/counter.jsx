import React, { useState } from "react";
import useDocumentTitle from "./use-document-title";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // componentDidMount
  // componentDidUpdated

  useDocumentTitle(name);

  return (
    <React.Fragment>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <div>
        {name} increased count to {count}{" "}
      </div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </React.Fragment>
  );
};

export default Counter;

import { useState } from "react";
import reactLogo from "./assets/react.svg";

import Counter from "./Counter";
import UserReducer1 from "./UserReducerStart";

function App() {
  const [count, setCount] = useState(0);

  return <UserReducer1 />;
}

export default App;

import Home from "./components/home";
import React, {useEffect} from "react";

function App() {

  useEffect(() => {
    document.title = "Konlap chat"
  }, []);

  return (
    <Home/>
  );
}

export default App;

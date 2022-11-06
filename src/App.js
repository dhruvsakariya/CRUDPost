import React from "react";

import { WrappedApp } from "./features/counter/Posts";
import "./App.css";
import CustomizedSnackbars from "./features/counter/FeedBack/SneakBar";

function App() {
  return (
    <div className="App">
      <WrappedApp />
      <CustomizedSnackbars/>
    </div>
  );
}

export default App;

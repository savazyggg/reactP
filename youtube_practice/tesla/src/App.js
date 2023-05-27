import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./components/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Home />
      </div>
    </Provider>
  );
}

export default App;

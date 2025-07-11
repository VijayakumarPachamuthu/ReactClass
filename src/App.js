import logo from "./logo.svg";
import "./App.css";
import List from "./Components/List";
import List1 from "./Components/List1";
import Routers from "./Routing/Routers";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import {storeData } from "./Store/Store";

function App() {
  return (
    <Provider store={storeData}>
      <div className="App">
        {/* <List/> */}
        {/* <List1/>
        <List/> */}
        <Routers />
      </div>
    </Provider>
  );
}

export default App;

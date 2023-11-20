import DataList from "./components/DataList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddList from "./components/AddList";
import EditList from "./components/EditList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataList />}/>
        <Route path="add" element={<AddList />}/>
        <Route path="edit/:id" element={<EditList />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

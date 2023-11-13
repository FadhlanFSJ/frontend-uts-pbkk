import FilmList from "./components/FilmList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddList from "./components/AddList";
import EditList from "./components/EditList";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FilmList />}/>
        <Route path="add" element={<AddList />}/>
        <Route path="edit/:id" element={<EditList />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddGuitar from './components/AddGuitar';
import ShowGuitars from "./components/ShowGuitars";
import EditGuitars from './components/EditGuitars';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowGuitars />} />
        <Route path="/create" element={<AddGuitar />} />
        <Route path="/edit/:id" element={<EditGuitars />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

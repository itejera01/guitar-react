import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowGuitars from "./components/ShowGuitars";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/showGuitars" element={<ShowGuitars></ShowGuitars>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

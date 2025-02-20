
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Admin from "./Pages/Admin";

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

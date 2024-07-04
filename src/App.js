import CountryDetails from "./Pages/CountryDetails";
import Nav from "./Components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries/:countryCode" element={<CountryDetails />} />
          <Route path="*" element={<h2>404 page not found</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

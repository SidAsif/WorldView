import CountryDetails from "./Pages/CountryDetails";
import Nav from "./Components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import News from "./Pages/News";
import Contact from "./Components/Contact";
import CompareCountries from "./Pages/CompareCountries";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries/:countryCode" element={<CountryDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/compare" element={<CompareCountries />} />
          <Route path="*" element={<h2>No Data Found</h2>} />
        </Routes>
        <div id="contact">
          <Contact />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

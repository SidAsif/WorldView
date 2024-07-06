import CountryDetails from "./Pages/CountryDetails";
import Nav from "./Components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import News from "./Pages/News";
import Contact from "./Components/Contact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries/:countryCode" element={<CountryDetails />} />
          <Route path="/news" element={<News />} />

          <Route path="*" element={<h2>No Data Found</h2>} />
        </Routes>
        <Contact />
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ClerkProvider, SignIn, SignUp, ClerkLoaded } from "@clerk/clerk-react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import CountryDetails from "./Pages/CountryDetails";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import News from "./Pages/News";
import Contact from "./Components/Contact";
import CompareCountries from "./Pages/CompareCountries";
import SavedCountries from "./Pages/SavedCountries";
import UserDashboard from "./Pages/UserDashboard";
import { Toaster } from "react-hot-toast";
import CommunityTips from "./Components/CommunityTips";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function AppWrapper() {
  const location = useLocation();
  const hideLayout =
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/login");

  return (
    <>
      <Toaster />
      {!hideLayout && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries/:countryCode" element={<CountryDetails />} />
        <Route path="/news" element={<News />} />
        <Route path="/compare" element={<CompareCountries />} />
        <Route path="/saved" element={<SavedCountries />} />
        <Route path="/stories" element={<CommunityTips />} />

        {/* Clerk Auth pages */}
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <UserDashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/signup/*"
          element={
            <div style={authPageStyle}>
              <SignUp routing="path" path="/signup" />
            </div>
          }
        />
        <Route
          path="/login/*"
          element={
            <div style={authPageStyle}>
              <SignIn routing="path" path="/login" />
            </div>
          }
        />

        <Route path="*" element={<h2>No Data Found</h2>} />
      </Routes>

      {!hideLayout && (
        <div id="contact">
          <Contact />
        </div>
      )}
    </>
  );
}

// Style for centering SignUp and SignIn cards
const authPageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ClerkLoaded>
        <BrowserRouter>
          <AppWrapper />
        </BrowserRouter>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default App;

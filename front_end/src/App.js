import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import './App.css';
import LoginPage from "./views/LoginPage.js";
import SignUpPage from "./views/SignUpPage.js";
import LandingPage from "./views/LandingPage.js";
import ProfilePage from "./views/ProfilePage.js";
import CreateEventPage from "./views/CreateEventPage.js";
import MyEventsPage from "./views/MyEventsPage.js";
import { AuthProvider } from "./context/AuthProvider.js";
import { UserContext } from "./context/UserContext.js";
import { useState } from "react";
import ViewEventPage from "./views/ViewEventPage.js";
import ReviewPage from "./views/ReviewPage.js";
import ViewParticipantsPage from "./views/ViewParticipants.js";
function App() {
  const [auth, setAuth] = useState({});
  return (
    <Router>
      <UserContext.Provider value={{ auth, setAuth }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Landing" element={<LandingPage />} />
          <Route path="/Profile/:username" element={<ProfilePage />} />
          <Route path="/Create" element={<CreateEventPage />} />
          <Route path="/MyEvents" element={<MyEventsPage />} />
          <Route path="/Event/:id" element={<ViewEventPage />} />
          <Route path="/Review/:target_username" element={<ReviewPage />} />
          <Route
            path="/ViewParticipants/:event_id"
            element={<ViewParticipantsPage />}
          />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

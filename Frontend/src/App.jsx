import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/ResgistrationPage";
import Dashboard from './pages/Dashboard';
import TasksPage from "./pages/TasksPage";
import CalendarView from "./pages/Calendar";
import Setting from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/registrationpage" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/settings" element={<Setting />} />
          {/* <Route path="/passwordmanager" element={<Setting />} /> */}

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

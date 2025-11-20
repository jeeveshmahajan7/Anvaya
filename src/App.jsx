import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnvayaProvider } from "./context/AnvayaContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Agents from "./pages/Agents";
import Reports from "./pages/Reports";
import LeadDetails from "./pages/LeadDetails";
import LeadsByStatus from "./pages/LeadsByStatus";
import LeadsByAgents from "./pages/LeadsByAgents";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <AnvayaProvider>
        <Router>
          <div className="app-layout">
            <Sidebar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/lead/:leadId" element={<LeadDetails />} />
                <Route path="/leads/status" element={<LeadsByStatus />} />
                <Route path="/leads/agents" element={<LeadsByAgents />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AnvayaProvider>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;

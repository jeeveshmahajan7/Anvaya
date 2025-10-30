import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnvayaProvider } from "./context/AnvayaContext";

import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Agents from "./pages/Agents";
import Reports from "./pages/Reports";

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
              </Routes>
            </div>
          </div>
        </Router>
      </AnvayaProvider>
    </>
  );
}

export default App;

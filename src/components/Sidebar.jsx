import { SlMagnet, SlPeople, SlMap, SlSettings } from "react-icons/sl";
import { PiCurrencyInrLight } from "react-icons/pi";
import { BsToggles } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const currentLocation = useLocation();
  const isHomepage = currentLocation.pathname === "/"; //checking if current url is homepage

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-main-navigation">
          <Link to="/">
            <img
              src="/src/images/logos/Anvaya Logo.png"
              alt="Anvaya Logo Image"
              className="anvaya-logo"
            />
          </Link>

          <hr />
          {isHomepage ? (
            <>
              <ul className="sidebar-list">
                <li className="sidebar-list-item">
                  <Link className="sidebar-text" to="/leads">
                    <SlMagnet className="sidebar-logo" />
                    <span>Leads</span>
                  </Link>
                </li>
                <li className="sidebar-list-item">
                  <Link className="sidebar-text" to="#">
                    <PiCurrencyInrLight className="sidebar-logo" />
                    <span>Sales</span>
                  </Link>
                </li>
                <li className="sidebar-list-item">
                  <Link className="sidebar-text" to="/agents">
                    <SlPeople className="sidebar-logo" />
                    <span>Agents</span>
                  </Link>
                </li>
                <li className="sidebar-list-item">
                  <Link className="sidebar-text" to="/reports">
                    <SlMap className="sidebar-logo" />
                    <span>Reports</span>
                  </Link>
                </li>
                <li className="sidebar-list-item">
                  <Link className="sidebar-text" to="#">
                    <SlSettings className="sidebar-logo" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
              <hr />
            </>
          ) : (
            <div className="sidebar-homepage-navigation">
              <Link className="sidebar-text" to="/">
                <RxDashboard className="sidebar-logo" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
          )}
        </div>

        <div className="sidebar-toggle">
          <BsToggles className="sidebar-logo" />
          <p className="sidebar-toggle-text">Toggle Sidebar</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

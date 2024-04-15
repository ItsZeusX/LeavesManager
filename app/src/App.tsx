//ROUTER
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { LeavesContainer } from "./components/LeavesContainer";
import { useContext, useEffect, useState } from "react";
import storeContext from "./contexts/Store";
import { Sidebar } from "./components/Sidebar";
import EmployeesContainer from "./components/Employees/EmployeesContainer";
import DashboardContainer from "./components/Dashboard/DashboardContainer";


function App() {
  const { setUser } = useContext(storeContext);
  //AUTHETICATE -----------------------------------------------------------
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    fetch("/api/authenticate")
      .then((res) => {
        if (res.status !== 200) {
          window.location.pathname !== "/login" &&
            window.location.replace("/login");
        } else {
          setAuthenticated(true);
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      });
  }, []);
  //-------------------------------------------------------------------------
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          {authenticated && (
            <>
              <Route path="/" element={<Navigate to="/leaves" />}></Route>
              <Route
                path="/leaves"
                element={
                  <div className="flex ">
                    <Sidebar />
                    <LeavesContainer />
                  </div>
                }
              ></Route>
              <Route
                path="/employees"
                element={
                  <div className="flex ">
                    <Sidebar />
                    <EmployeesContainer />
                  </div>
                }
              ></Route>
              <Route
                path="/dashboard"
                element={
                  <div className="flex ">
                    <Sidebar />
                    <DashboardContainer />
                  </div>
                }
              ></Route>
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

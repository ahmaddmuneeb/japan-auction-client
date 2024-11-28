// React Router Dome Components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// pages
import HomePage from "../pages/Home";

const MainRouter = () => {
  const validRoutes = ["/", "/about", "/contact", "/inventory", "/finance"];

  const isRouteValid = validRoutes.includes(window.location.pathname);

  return (
    <Router>
      <Routes>
        {isRouteValid ? (
          <>
            <Route path="/" element={<HomePage />} />
          </>
        ) : (
          {}
        )}
      </Routes>
    </Router>
  );
};

export default MainRouter;

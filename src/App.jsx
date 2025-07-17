
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import DiscoverHeader from "./components/DiscoverHeader";
import Footer from "./components/Footer.jsx";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();

  // Reset scroll position to top on route change
  useEffect(() => {
    window.scrollTo(0, 0); // Instant reset to top, no animation
  }, [location.pathname]); // Run on every route change

  const showDiscoverHeader = location.pathname === "/discover";

  return (
    <>
      {showDiscoverHeader ? <DiscoverHeader /> : <Header />}
        <Outlet />
      <Footer />
    </>
  );
};

export default App;

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import App from "./App.jsx";

import ErrorPage from "./Pages/ErrorPage.jsx";

import Discover from "./Pages/Discover.jsx";
import Landing from "./Pages/Landing.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
// import Home from "./Pages/Home.jsx";
// import Home from "./Pages/Home.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="/" index element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/discover" element={<Discover />} />
      {/* <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} /> */}
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

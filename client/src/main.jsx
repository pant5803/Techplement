import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./store/auth-store.jsx";

import Home from "./pages/Home.jsx";
import MoreQuotes from "./pages/MoreQuotes.jsx";
import LikedQuotes from "./pages/LikedQuotes.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Search from "./pages/Search.jsx";
import Logout from "./pages/Logout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/morequotes", element: <MoreQuotes /> },
      { path: "/likedquotes", element: <LikedQuotes /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/search", element: <Search /> },
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);

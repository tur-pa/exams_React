import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import LoginPage from "./components/LoginPage/LoginPage";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page404 from "./components/Page404/Page404";
import store from "./redux/store";
import { Provider } from "react-redux";
import ProductDetails from "./components/ProductsDetails/ProductsDetails";
import Dashboard from "./components/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <Page404 />,
  },
  {
    path: "/products",
    element: <App />,
    children: [
      {
        path: "list",
        element: <Dashboard />,
      },
      {
        path: "productDetails/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();

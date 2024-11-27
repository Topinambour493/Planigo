import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import HomePage,
{
  loader as productsLoader
} from "../src/pages/HomePage/HomePage"
import {createBrowserRouter, RouterProvider} from "react-router";
import LandingPage from "./pages/LandingPage/LandingPage";

const router = createBrowserRouter([
{
  path: "/",
  element: <HomePage/>,
  loader: productsLoader
},
  {
    path: '/landing',
    element: <LandingPage/>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

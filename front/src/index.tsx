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
import AttractionDetailPage,{
  loader as productLoader
} from '../src/pages/AttractionDetailPage/AttractionDetailPage';

import LandingPage,{
  loader as landingPageLoader
} from '../src/pages/LandingPage/LandingPage';

const router = createBrowserRouter([
{
  path: "/",
  element: <LandingPage/>,
  loader: landingPageLoader
},
{
  path: "/home",
  element: <HomePage/>,
  loader: productsLoader
},
{
  path: "attraction/:id",
  element: <AttractionDetailPage/>,
  loader: productLoader
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

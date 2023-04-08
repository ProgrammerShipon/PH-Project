import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Books from "./components/books";
import BookDetails from "./components/BookDetails";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/books',
        element: <Books /> ,
        // loader: () => fetch(`https://api.itbook.store/1.0/new`)
        // loader: () => fetch(`https://raw.githubusercontent.com/ProgrammerShipon/PH-Project/master/next-page-react-route/public/bookData.json`)
        loader: () => fetch('bookData.json')
      },
      {
        path: '/bookDetails/:id',
        element: <BookDetails />,
        loader: ({params}) =>  fetch(`https://api.itbook.store/1.0/books/${params.id}`)
      },
      {
        path: '/about',
        element: <About /> 
      }
    ]
	},
  {
    path: '/about',
    element: <p>About Page</p>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home"
import Fiis from "./pages/fiis"
import FiisDetalhes from "./pages/fiis/detalhes"

const router = createBrowserRouter([
  {
    path: '/token/:id',
    element: <HomePage />
  },
  {
    path: '/fiis/detalhes/:id',
    element: <FiisDetalhes />
  },
  {
    path: '/fiis',
    element: <Fiis />
  },
  {
    path: '/',
    element: <HomePage />
  },
  

]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Token from "./pages/cripto"
import Home from "./pages/home"
import Fmw from "./pages/ea-experts"
import Fiis from "./pages/fiis"
import FiisDetalhes from "./pages/fiis/detalhes"
import Lotofacil from "./pages/lotofacil/index"
import Grupos from "./pages/lotofacil/grupos";
import Links from "./pages/links/index"

const router = createBrowserRouter([
  {
    path: '/ea-experts/fmw',
    element: <Fmw />
  },
  {
    path: '/token/:id',
    element: <Token />
  },
  {
    path: '/token',
    element: <Token />
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
    path: '/lotofacil/grupos',
    element: <Grupos />
  },
  {
    path: '/lotofacil',
    element: <Lotofacil />
  },
  {
    path: '/linktree',
    element: <Links />
  },
  {
    path: '/',
    element: <Home />
  },
  

]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

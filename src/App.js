import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home"
import WalletPage from "./pages/wallet"

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/wallet',
    element: <WalletPage />
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

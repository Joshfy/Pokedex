import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./app/pages/HomePage";
import { PokemonDetailPage } from "./app/pages/PokemonDetailPage";
import {Layout} from "./app/layout";

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "pokemon/:id",
          element: <PokemonDetailPage />,
        },
      ],
    },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;

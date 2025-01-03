import HomePage from "@/components/pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Index = () => {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default Index;

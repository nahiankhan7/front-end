// import HomePage from "@/components/pages/HomePage";
import Test from "@/components/pages/Test";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Index = () => {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Test />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default Index;

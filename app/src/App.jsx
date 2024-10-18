import { useEffect, useState } from "react";
import EditorPage from "./EditorPage";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

function App() {
  // const [randomToken, setRandomToken] = useState("");

  // useEffect(() => {
  //   let token = localStorage.getItem("token");

  //   if (!token) {
  //     token = Math.random().toString(36).substr(2, 9);
  //     localStorage.setItem("token", token);
  //   }

  //   setRandomToken(token);
  // }, []);

  const isAuthenticated = !!localStorage.getItem("token");
  console.log(isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/note/:id",
      element: isAuthenticated ? <EditorPage /> : <Navigate to="/login/" />,
    },
    {
      path: "*",
      element: (
        <Navigate to={`/note/${Math.random().toString(36).substr(2, 9)}`} />
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

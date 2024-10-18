import { useState } from "react";
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
  const randomtoken = Math.random().toString(4);
  localStorage.setItem("token", randomtoken);
  const isAuthenticated = !!localStorage.getItem("token", randomtoken);
  console.log(randomtoken);
  console.log(isAuthenticated);
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <>
          <LoginPage />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <RegisterPage />
        </>
      ),
    },
    {
      path: "/note/:id",
      element: <>{isAuthenticated ? <EditorPage /> : <LoginPage />}</>,
    },
    {
      path: "/note/:id",
      element: (
        <>
          <EditorPage />
        </>
      ),
    },
    {
      path: "*", //for all the unique user id will be created
      element: (
        <>
          <Navigate to={`/note/${Math.random().toString(36).substr(2, 9)}`} />
        </>
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

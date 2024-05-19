import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./components/homepage/Homepage.jsx";
import { CreatePost } from "./components/homepage/createPost/CreatePost.jsx";
import { Feed } from "./components/homepage/feed/Feed.tsx";
import { Post } from "./components/homepage/post/Post.tsx";
import { PersonalProfile } from "./components/homepage/personalProfile/PersonalProfile.tsx";
import { SearchAddUsers } from "./components/homepage/searchAddUsers/SearchAddUsers.tsx";
import { UserProfile } from "./components/homepage/userProfile/UserProfile.jsx";
import { Login } from "./components/loginSignup/Login.jsx";
import { Signup } from "./components/loginSignup/Signup.jsx";
import { Error } from "./components/error/Error.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      { path: "sign_up", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "error", element: <Error /> },
      {
        path: "/",
        element: <Homepage />,
        children: [
          { path: "/", element: <Feed /> },
          { path: "/create_post", element: <CreatePost /> },
          { path: "/me", element: <PersonalProfile /> },
          { path: "/search_users", element: <SearchAddUsers /> },
          { path: "/users/:userID", element: <UserProfile /> },
          { path: "/posts/:postID", element: <Post /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

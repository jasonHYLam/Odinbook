import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { Homepage } from "./components/homepage/Homepage.jsx";
import { CreatePost } from "./components/homepage/createPost/CreatePost.jsx";
import { Feed } from "./components/homepage/feed/Feed.jsx";
import { Post } from "./components/homepage/post/Post.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "home",
        element: <Homepage />,
        children: [
          {
            path: "create_post",
            element: <CreatePost />,
          },
          {
            path: "/",
            element: <Feed />,
          },
          {
            path: ":postID",
            element: <Post />,
          },
        ],
      },
    ],
  },
  // login
  //signup
  //home (feed)
  // addfriend
  // createPost
  // viewOwnProfile
  // view other profile
  // view post
  // logout
  // {}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

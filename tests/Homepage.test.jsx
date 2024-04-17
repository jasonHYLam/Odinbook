import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Route, RouterProvider } from "react-router-dom";

import { Homepage } from "../src/components/homepage/Homepage";
import { Login } from "../src/components/loginSignup/Login";
import { Feed } from "../src/components/homepage/feed/Feed";
import { RenderRouteWithOutletContext } from "./RenderRouteWithOutletContext";

describe("App", () => {
  it("renders initial homepage", () => {
    const routes = [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const loading = screen.getByRole("paragraph");
    expect(loading.textContent).toBe("loading");
  });
});

describe("Feed", () => {
  it("renders post previews in the feed", () => {
    const loggedInUser = {};
    const feed = [
      {
        //post
        creator: {
          username: "RiverEuphrates",
          profilePicURL: "",
        },
        text: "Ride a tire",
      },
    ];
    const routes = [
      {
        path: "/",
        element: (
          <RenderRouteWithOutletContext context={{ loggedInUser, feed }} />
        ),
        children: [
          {
            path: "/",
            element: <Feed />,
          },
        ],
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={router} />);

    const postText = screen.getByText("Ride a tire");
    expect(postText).toBeInTheDocument();
  });
});

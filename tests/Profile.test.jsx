import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { createMemoryRouter, Route, RouterProvider } from "react-router-dom";
import { PersonalProfile } from "../src/components/homepage/personalProfile/PersonalProfile";
import { RenderRouteWithOutletContext } from "./RenderRouteWithOutletContext";
import { beforeEach, vi } from "vitest";

describe("personal profile", () => {
  beforeEach(() => {
    vi.spyOn(global, "fetch").mockImplementation(() => {
      return;
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("loads settings dialog when clicked", () => {
    const loggedInUser = {};
    const likedPosts = [];
    const routes = [
      {
        path: "/",
        element: (
          <RenderRouteWithOutletContext
            context={{ loggedInUser, likedPosts }}
          />
        ),
        children: [{ path: "/me", element: <PersonalProfile /> }],
      },
    ];
    const router = createMemoryRouter(routes, { initialEntries: ["/me"] });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("span", { name: "settings" })).toBeInTheDocument();
  });
});

import { describe, it, expect, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { createMemoryRouter, Route, RouterProvider } from "react-router-dom";
import { PersonalProfile } from "../src/components/homepage/personalProfile/PersonalProfile";
import { RenderRouteWithOutletContext } from "./RenderRouteWithOutletContext";
import { beforeEach, vi } from "vitest";
import * as helpers from "../src/helper/helperUtils";

describe("personal profile", () => {
  beforeEach(() => {
    // Two valid methods for mocking fetch for reference

    // Method 1:
    // vi.spyOn(helpers, "fetchData").mockImplementation(() => {
    //   const getUserPostsResponse = new Response(JSON.stringify({ posts: [] }), {
    //     status: 201,
    //   });

    //   return getUserPostsResponse;
    // });

    // Method 2:
    vi.spyOn(helpers, "fetchData").mockResolvedValue(
      new Response(JSON.stringify({ posts: [] }), {
        status: 201,
      })
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("loads personal profile", async () => {
    const loggedInUser = { following: [], followers: [] };
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

    await waitFor(() => {
      // screen.getByRole("span", { name: "settings" });
      expect(helpers.fetchData).toHaveBeenCalledOnce();
    });

    // expect(screen.getByRole("span", { name: "settings" })).toBeInTheDocument();
    expect(screen.getByText("settings")).toBeInTheDocument();
    expect(screen.getByText("followers")).toBeInTheDocument();
    expect(screen.getByText("following")).toBeInTheDocument();
    expect(screen.getByText("logout")).toBeInTheDocument();
  });
});

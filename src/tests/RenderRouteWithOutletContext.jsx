import { Outlet } from "react-router-dom"

import <Outlet
export function RenderRouteWithOutletContext({ context }) {
  return (
    <Outlet context={context} />
  )
}
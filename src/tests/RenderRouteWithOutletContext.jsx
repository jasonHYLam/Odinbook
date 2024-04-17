import { Outlet } from "react-router-dom";

export function RenderRouteWithOutletContext({ context }) {
  return <Outlet context={context} />;
}

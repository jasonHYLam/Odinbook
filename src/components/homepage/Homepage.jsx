import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Homepage() {
  return (
    <>
      <Header />
      <main>
        <p>its me homepage</p>
        <Outlet />
      </main>
    </>
  );
}

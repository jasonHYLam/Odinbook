import { Outlet } from "react-router-dom";

export function Homepage() {
  return (
    <>
      <header>its me the header</header>
      <main>
        <p>its me homepage</p>
        <Outlet />
      </main>
    </>
  );
}

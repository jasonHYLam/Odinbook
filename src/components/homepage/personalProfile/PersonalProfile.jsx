import { useOutletContext } from "react-router-dom";

export function PersonalProfile() {
  const { user } = useOutletContext();
  return (
    <main>
      <p>it's me personalProfile</p>
      <h2>{user.username}</h2>
    </main>
  );
}

import { useEffect, useState } from "react";
import { fetchData } from "../../../helper/helperUtils";
import { useNavigate, useParams } from "react-router-dom";

export function UserProfile() {
  const navigate = useNavigate();
  const { userID } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  console.log("checking user");
  console.log(user);

  useEffect(() => {
    async function fetchUserData() {
      const getUserResponse = await fetchData(`user/${userID}/profile`);
      if (!getUserResponse.ok || getUserResponse instanceof Error) {
        navigate("/error");
      } else {
        const { user } = await getUserResponse.json();
        setUser(user);
      }
    }
    fetchUserData();
  }, []);
  return (
    <main>
      <p>it's me userProfile</p>
    </main>
  );
}

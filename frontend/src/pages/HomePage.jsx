import { useEffect } from "react";
import { useAuth } from "@clerk/react";

const HomePage = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const syncUser = async () => {
    const token = await getToken();

    const response = await fetch("http://localhost:8000/users/sync", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }
    syncUser();
  }, [isLoaded, isSignedIn]);

  return (
    <>
      <h2>Homepage</h2>
    </>
  );
};

export default HomePage;

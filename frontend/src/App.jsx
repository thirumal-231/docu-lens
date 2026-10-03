import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Show, UserButton } from "@clerk/react";
import SignInPage from "./pages/SignInPage";
import "./app.css";

import { useAuth } from "@clerk/react";
import { useEffect } from "react";

const App = () => {
  const { isSignedIn, userId, getToken } = useAuth();

  useEffect(() => {
    const getAuthToken = async () => {
      if (!isSignedIn) return;

      const token = await getToken();

      console.log("user id", userId);
      console.log("is signed in", isSignedIn);
      console.log("Token", token);
    };
    getAuthToken();
  }, [isSignedIn, userId, getToken]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Show when="signed-out">
                  <SignInPage />
                </Show>
                <Show when="signed-in">
                  <HomePage />
                </Show>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

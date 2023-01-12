import { useEffect } from "react";
import Router from "next/router";

export const useAuth = () => {
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") !== "true") {
      Router.push("/");
    }
  }, []);
};

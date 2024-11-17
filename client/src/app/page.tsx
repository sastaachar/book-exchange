"use client";

import { useAppContext } from "@context";
import { authService } from "@services";
import { useEffect } from "react";
import { Vertical } from "@components/container";
import { NotLoggedInHome } from "@components/notLoggedInHome";
import { AddBookQueuePage } from "@components/loggedInApp";

export default function Home() {
  const { loggedIn, setUser, setLoggedIn } = useAppContext();

  useEffect(() => {
    authService.isLoggedIn().then(([user]) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
      }
    });
  }, [setLoggedIn, setUser]);

  if (!loggedIn) {
    return <NotLoggedInHome />;
  }

  return (
    <Vertical
      styles={{
        height: "100%",
        flexGrow: "1",
      }}
    >
      <AddBookQueuePage />
    </Vertical>
  );
}

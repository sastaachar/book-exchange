"use client";

import { CuteButton } from "@components/button";
import { useAppContext } from "@context";
import { authService, isLoggedIn } from "../services/auth";
import { getLogger } from "@utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const logger = getLogger("home/page");

export default function Home() {
  const router = useRouter();
  const { loggedIn, setUser, setLoggedIn, user } = useAppContext();

  const { t } = useTranslation();

  useEffect(() => {
    isLoggedIn().then(([user]) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
      }
    });
  }, [setLoggedIn, setUser]);

  if (!loggedIn) {
    logger.log("User not logged in, Redirecting to login");
    queueMicrotask(() => {
      router.push("/login");
    });
    return null;
  }

  return (
    <div>
      Home - {loggedIn} {JSON.stringify(user)}
      <Link href={"/login"}>{t("Login")}</Link>
      <CuteButton
        onClick={async () => {
          const [isLoggedOut, error] = await authService.logout();
          if (isLoggedOut && !error) {
          } else {
          }
        }}
      >
        Logout
      </CuteButton>
    </div>
  );
}

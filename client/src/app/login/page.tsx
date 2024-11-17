"use client";

import { CuteButton } from "@components/button";
import { Horizontal, Vertical } from "@components/container";
import { CuteInput } from "@components/input";
import { useAppContext } from "@context";
import { authService } from "@services";
import { getLogger, cuteToast } from "@utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

const logger = getLogger("login/page");

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loggedIn, setLoggedIn, setUser } = useAppContext();

  const { t } = useTranslation();

  const router = useRouter();

  useEffect(() => {
    authService.isLoggedIn().then(([user]) => {
      if (user) {
        setUser(user);
        setLoggedIn(true);
      }
    });
  }, [setLoggedIn, setUser]);

  const handleLoginClick = useCallback(async () => {
    const [user, loginError] = await authService.login({
      email,
      password,
    });
    if (loginError || !user) {
      setLoggedIn(false);
      cuteToast(loginError?.message, { type: "error" });
      logger.log("Login failed");
      return;
    }
    logger.log("Login success");
    setLoggedIn(true);
    setUser(user);
  }, [setLoggedIn, email, password, setUser]);

  if (loggedIn) {
    logger.log("User already logged in, Redirecting to home");
    queueMicrotask(() => {
      router.push("/");
    });
    return null;
  }

  return (
    <Vertical
      styles={{
        height: "100%",
        flexGrow: 1,
      }}
    >
      <Vertical>
        <Horizontal>
          <label>{t("Username")}:</label>
          <CuteInput value={email} onChange={setEmail} />
        </Horizontal>
        <Horizontal>
          <label>{t("Password")} :</label>
          <CuteInput value={password} onChange={setPassword} type="password" />
        </Horizontal>
        <Vertical>
          <CuteButton onClick={handleLoginClick}>{t("Login")}</CuteButton>
        </Vertical>
      </Vertical>
    </Vertical>
  );
}

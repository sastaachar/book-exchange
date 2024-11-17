"use client";

import { CuteButton } from "@components/button";
import { Horizontal, Vertical } from "@components/container";
import { CuteInput } from "@components/input";
import { useAppContext } from "@context";
import { authService } from "@services";
import { userService } from "@services";
import { cuteToast } from "@utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);

  const { setUser } = useAppContext();
  const { t } = useTranslation();

  const router = useRouter();

  const handleSignUp = async () => {
    setSignUpLoading(true);
    if (password !== passwordConfirm) {
      cuteToast(t("PasswordDontMatch"), {
        type: "error",
      });
      setSignUpLoading(false);
      return;
    }

    const [wrongEmail, checkEmailErr] = await userService.doesEmailExist(email);

    if (wrongEmail || checkEmailErr) {
      cuteToast(t("EmailAlreadyExist"), {
        type: "error",
      });
      setSignUpLoading(false);
      return;
    }

    const [user, createError] = await userService.createUser({
      email,
      password,
      name,
    });

    if (createError && !user) {
      cuteToast(createError.message, {
        type: "error",
      });
      setSignUpLoading(false);
      return;
    }

    setUser(user as any);
    setSignUpLoading(false);
    authService.login({ email, password }).then(() => {
      router.push("/login");
    });
  };

  return (
    <Vertical
      styles={{
        height: "100%",
        flexGrow: 1,
      }}
    >
      <Vertical>
        <Horizontal
          styles={{
            justifyContent: "center",
          }}
        >
          {t("SignUp")}
        </Horizontal>

        <Horizontal>
          <label>{t("Name")}</label>
          <CuteInput value={name} onChange={setName} />
        </Horizontal>

        <Horizontal>
          <label>{t("Email")}</label>
          <CuteInput value={email} onChange={setEmail} />
        </Horizontal>

        <Horizontal>
          <label>{t("Password")}</label>
          <CuteInput value={password} onChange={setPassword} />
        </Horizontal>

        <Horizontal>
          <label>{t("ConfirmPassword")}</label>
          <CuteInput value={passwordConfirm} onChange={setPasswordConfirm} />
        </Horizontal>
      </Vertical>
      <CuteButton onClick={handleSignUp} disabled={signUpLoading}>
        {t("SignUp")}
      </CuteButton>
    </Vertical>
  );
}

import { Horizontal } from "@components/container";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { LanguageDropdown } from "./language-dropdown";
import { useAppContext } from "@context";
import { CuteButton } from "@components/button";
import { authService } from "@services/auth";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { t } = useTranslation();

  const { loggedIn } = useAppContext();

  const router = useRouter();

  return (
    <Horizontal>
      {!loggedIn && <Link href="/">{t("Home")}</Link>}
      {!loggedIn && <Link href="login">{t("Login")}</Link>}
      {!loggedIn && <Link href="signup">{t("SignUp")}</Link>}
      {loggedIn && (
        <CuteButton
          onClick={() => authService.logout().then(() => router.push("/login"))}
        >
          logout
        </CuteButton>
      )}
      <LanguageDropdown />
    </Horizontal>
  );
};

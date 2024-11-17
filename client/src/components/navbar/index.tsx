import { Horizontal } from "@components/container";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { LanguageDropdown } from "./language-dropdown";
import { useAppContext } from "@context";
import { CuteButton } from "@components/button";
import { authService } from "@services";
import { useRouter, usePathname } from "next/navigation"; // Change to `next/router`
import styles from "./navbar.module.scss";

export const Navbar = () => {
  const { t } = useTranslation();
  const { loggedIn } = useAppContext();
  const router = useRouter();

  const pathName = usePathname();

  const NavLinks = () => (
    <Horizontal>
      {!loggedIn && (
        <Link
          href="/"
          className={`${styles.navLink} ${
            pathName === "/" ? styles.activeLink : ""
          }`}
        >
          {t("Home")}
        </Link>
      )}
      {!loggedIn && (
        <Link
          href="login"
          className={`${styles.navLink} ${
            pathName === "/login" ? styles.activeLink : ""
          }`}
        >
          {t("Login")}
        </Link>
      )}
      {!loggedIn && (
        <Link
          href="signup"
          className={`${styles.navLink} ${
            pathName === "/signup" ? styles.activeLink : ""
          }`}
        >
          {t("SignUp")}
        </Link>
      )}
      {loggedIn && (
        <Link
          href="home"
          className={`${styles.navLink} ${
            pathName === "/" ? styles.activeLink : ""
          }`}
        >
          {t("Home")}
        </Link>
      )}
      {loggedIn && (
        <Link
          href="listings"
          className={`${styles.navLink} ${
            pathName === "/listings" ? styles.activeLink : ""
          }`}
        >
          {t("Listings")}
        </Link>
      )}
      {loggedIn && (
        <Link
          href="profile"
          className={`${styles.navLink} ${
            pathName === "/profile" ? styles.activeLink : ""
          }`}
        >
          {t("Profile")}
        </Link>
      )}
      {loggedIn && (
        <CuteButton
          onClick={() => authService.logout().then(() => router.push("/login"))}
          className={styles.logoutButton}
        >
          {t("Logout")}
        </CuteButton>
      )}
    </Horizontal>
  );

  return (
    <Horizontal>
      <NavLinks />
      <LanguageDropdown />
    </Horizontal>
  );
};

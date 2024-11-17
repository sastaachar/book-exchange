import { Vertical } from "@components/container";
import { useTranslation } from "react-i18next";

export const NotLoggedInHome = () => {
  const { t } = useTranslation();

  return (
    <Vertical
      styles={{
        height: "100%",
        flexGrow: 1,
      }}
    >
      {t("WelcomeNote")}
    </Vertical>
  );
};

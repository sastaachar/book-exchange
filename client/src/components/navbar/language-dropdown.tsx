"use client";

import { AppLanguage } from "@appTypes";
import { CuteDropdown } from "@components/dropdown";
import { useAppContext } from "@context";
import { useTranslation } from "react-i18next";

export const LanguageDropdown = () => {
  const { t } = useTranslation();

  const { appLanguage, setAppLanguage } = useAppContext();

  return (
    <CuteDropdown
      styles={{
        maxWidth: "200px",
      }}
      value={appLanguage}
      options={[
        {
          groupName: t("Chinese"),
          values: [
            {
              name: t(AppLanguage.zhCN),
              value: AppLanguage.zhCN,
            },
          ],
        },
        {
          name: t(AppLanguage.en),
          value: AppLanguage.en,
        },
        {
          name: t(AppLanguage.es),
          value: AppLanguage.es,
        },
      ]}
      onSelect={setAppLanguage}
    />
  );
};

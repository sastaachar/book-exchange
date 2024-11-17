"use client";

import { toast } from "react-toastify";
import { initReactI18next } from "react-i18next";
import translationEN from "@locales/en/translation.json";
import translationES from "@locales/es/translation.json";
import translationZH_CN from "@locales/zh-CN/translation.json";
import i18n from "i18next";
import { AppLanguage } from "@appTypes";
import { getLogger } from "./logger";

export const sleep = async (time: number) => {
  return new Promise<undefined>((resolve) => {
    setTimeout(resolve, time);
  });
};

export const noop = () => {};

export const logger: {
  log: typeof console.log;
} = {
  log: (...args) => {
    console.log("[]", args);
  },
};
const defaultErrorMessage = "Some error occurred !";
export const cuteToast = (...args: Parameters<typeof toast>) => {
  const updatedArgs = args;
  updatedArgs[0] = updatedArgs[0] || defaultErrorMessage;
  return toast(...updatedArgs);
};

export const i18nInit = (appLanguage: AppLanguage = AppLanguage.en) => {
  const logger = getLogger("i18nInit");
  const cachedConfig = getAppConfigFromCache();
  logger.log("Getting cached config", cachedConfig);
  return i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: translationEN,
      },
      es: {
        translation: translationES,
      },
      "zh-CN": {
        translation: translationZH_CN,
      },
    },
    fallbackLng: "en",
    lng: appLanguage,
    interpolation: {
      escapeValue: false,
    },
  });
};

interface CachedConfig {
  appLanguage?: AppLanguage;
}

const defaultCachedConfig: CachedConfig = {
  appLanguage: AppLanguage.en,
};

const appCacheKey = "book-exchange-jstnm";

export const getAppConfigFromCache = (): CachedConfig => {
  try {
    if (!window?.localStorage) return defaultCachedConfig;
    const configString = window?.localStorage?.getItem(appCacheKey);
    const configJson = JSON.parse(configString || "{}");
    return configJson;
  } finally {
    return {};
  }
};

export const setAppConfigToCache = (appConfig: CachedConfig) => {
  const currentConfig = getAppConfigFromCache();
  const configToSet = { ...currentConfig, ...appConfig };
  return window?.localStorage?.setItem(
    appCacheKey,
    JSON.stringify(configToSet)
  );
};

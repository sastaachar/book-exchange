"use client";

import { noop, setAppConfigToCache } from "@utils";
import React, { createContext, useContext, useState } from "react";
import { AppLanguage, SetterFunction, User } from "@appTypes";
import { useTranslation } from "react-i18next";

type AppContextT = {
  loggedIn: boolean;
  setLoggedIn: SetterFunction<boolean>;
  user?: User;
  setUser: SetterFunction<User>;
  setAppLanguage: SetterFunction<AppLanguage>;
  appLanguage: AppLanguage;
  appConfigLoading: boolean;
  setAppConfigLoading: SetterFunction<boolean>;
};

const defaultAppContext: AppContextT = {
  loggedIn: false,
  setLoggedIn: noop,
  setUser: noop,
  appLanguage: AppLanguage.en,
  setAppLanguage: noop,
  appConfigLoading: false,
  setAppConfigLoading: noop,
};

const AppContext = createContext<AppContextT>(defaultAppContext);

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User>();
  const [appLanguage, _setAppLanguage] = useState(AppLanguage.en);
  const [appConfigLoading, setAppConfigLoading] = useState(false);
  const { i18n } = useTranslation();

  const setAppLanguage = (lng: AppLanguage) => {
    setAppConfigToCache({ appLanguage: lng });
    i18n.changeLanguage(lng);
    return _setAppLanguage(lng);
  };

  return (
    <AppContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        appLanguage,
        setAppLanguage,
        appConfigLoading,
        setAppConfigLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

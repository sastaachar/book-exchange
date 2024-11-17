import { Loading } from "@components/loading";
import { Navbar } from "@components/navbar";
import { AppProvider, useAppContext } from "@context";
import React from "react";
import { ToastContainer } from "react-toastify";

export const AppWithContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { appConfigLoading } = useAppContext();

  return (
    <AppProvider>
      <Navbar />
      <ToastContainer />
      {appConfigLoading ? <Loading /> : children}
    </AppProvider>
  );
};

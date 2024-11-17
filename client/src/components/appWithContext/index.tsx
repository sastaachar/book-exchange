import { Vertical } from "@components/container";
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
      <Vertical
        styles={{
          height: "100vh",
          width: "100vw",
          justifyContent: "space-between",
        }}
      >
        <Navbar />
        <ToastContainer />
        {appConfigLoading ? <Loading /> : children}
      </Vertical>
    </AppProvider>
  );
};

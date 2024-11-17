import React from "react";
import styles from "./container.module.scss";

type ContainerProps = {
  id?: string;
  children?: React.ReactNode;
};

const Vertical: React.FC<ContainerProps> = (props) => {
  return <div className={styles.vertical}>{props.children}</div>;
};

const Horizontal: React.FC<ContainerProps> = (props) => {
  return <div className={styles.horizontal}>{props.children}</div>;
};

export { Vertical, Horizontal };

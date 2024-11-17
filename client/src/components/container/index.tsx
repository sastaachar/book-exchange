import React from "react";
import styles from "./container.module.scss";

type ContainerProps = {
  id?: string;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
};

const Vertical: React.FC<ContainerProps> = (props) => {
  return (
    <div className={styles.vertical} style={props.styles}>
      {props.children}
    </div>
  );
};

const Horizontal: React.FC<ContainerProps> = (props) => {
  return (
    <div className={styles.horizontal} style={{ gap: "20px", ...props.styles }}>
      {props.children}
    </div>
  );
};

export { Vertical, Horizontal };

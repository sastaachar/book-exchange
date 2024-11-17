import React from "react";
import styles from "./button.module.scss";

type CuteButtonProps = {
  title?: string;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const CuteButton: React.FC<CuteButtonProps> = (props) => {
  return (
    <button className={styles.cuteButton} {...props}>
      {props.children}
    </button>
  );
};

export { CuteButton };

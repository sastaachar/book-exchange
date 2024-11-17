import React, { useCallback } from "react";
import styles from "./input.module.scss";

type CuteInputProps = {
  id?: string;
  onChange?: (value: string) => unknown;
  value?: string;
  type?: React.HTMLInputTypeAttribute;
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "onChange"
>;

const CuteInput: React.FC<CuteInputProps> = ({
  onChange,
  value,
  ...restProps
}) => {
  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value);
    },
    [onChange]
  );

  return (
    <input
      type={restProps.type || "text"}
      value={value}
      onChange={onInputChange}
      className={styles.cuteInput}
      {...restProps}
    />
  );
};

export { CuteInput };

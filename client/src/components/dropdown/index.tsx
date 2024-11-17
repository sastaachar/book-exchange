import React from "react";
import styles from "./dropdown.module.scss";

type OptionAllowedValues<T> = { name: string; value: T };
type GroupOptionValue<T> = {
  groupName: string;
  values: OptionAllowedValues<T>[];
};
type OptionValue<T> = GroupOptionValue<T> | OptionAllowedValues<T>;

type CuteDropdownProps<T> = {
  value: T;
  options?: OptionValue<T>[];
  onSelect?: (value: T) => void;
};

export const CuteDropdown = <T,>({
  options,
  onSelect,
  value,
}: CuteDropdownProps<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as unknown as T;
    onSelect?.(selectedValue);
  };

  return (
    <select
      onChange={handleChange}
      value={value as unknown as string}
      className={styles.cuteDropdown}
    >
      {options?.map((option) => {
        if ("groupName" in option) {
          return (
            <optgroup key={option.groupName} label={option.groupName}>
              {option.values.map((grpOpts) => (
                <option key={grpOpts.name} value={grpOpts.value as string}>
                  {grpOpts.name}
                </option>
              ))}
            </optgroup>
          );
        }
        return (
          <option key={option.name} value={option.value as string}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

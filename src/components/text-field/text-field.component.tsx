import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from "react";

import styles from "./text-field.module.scss";

interface TextFieldProps {
  autoComplete: string;
  autoCapitalize: string;
  className: string;
  disabled: boolean;
  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  readOnly: boolean;
  type: HTMLInputTypeAttribute;
  value: string;
}

const TextField: FC<Partial<TextFieldProps>> = ({
  autoCapitalize = "",
  autoComplete = "",
  className = "",
  disabled = false,
  id = "",
  name = "",
  onChange = () => {},
  placeholder = "",
  readOnly = false,
  type = "text",
  value = "",
}) => {
  return (
    <div className={className}>
      <input
        id={id}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        className={styles["TextField-input"]}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        title={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;

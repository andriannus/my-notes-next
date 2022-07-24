import { ChangeEvent, ChangeEventHandler, FC, useEffect } from "react";

import styles from "./textarea.module.scss";

interface TextAreaProps {
  autoComplete: string;
  autoCapitalize: string;
  className: string;
  disabled: boolean;
  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder: string;
  readOnly: boolean;
  value: string;
}

const TextArea: FC<Partial<TextAreaProps>> = ({
  autoCapitalize = "",
  autoComplete = "",
  className = "",
  disabled = false,
  id = "",
  name = "",
  onChange = () => {},
  placeholder = "",
  readOnly = false,
  value = "",
}) => {
  useEffect(() => {
    handleAutoResize();
  }, []);

  function handleAutoResize(): void {
    const elements = document.querySelectorAll<HTMLTextAreaElement>("textarea");
    const equalizingNumber = 2;

    elements.forEach((element) => {
      element.style.resize = "none";
      element.style.height = "auto";
      element.style.height = `${element?.scrollHeight + equalizingNumber}px`;
    });
  }

  function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    handleAutoResize();
    onChange(event);
  }

  return (
    <div className={className}>
      <textarea
        id={id}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        className={styles["TextArea-input"]}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        title={placeholder}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default TextArea;

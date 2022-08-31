import { ChangeEventHandler, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./search-field.module.scss";

interface SearchFieldProps {
  autoComplete: string;
  autoCapitalize: string;
  disabled: boolean;
  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  readOnly: boolean;
  type: string;
  value: string;
}

const SearchField: FC<Partial<SearchFieldProps>> = ({
  autoCapitalize = "",
  autoComplete = "",
  disabled = false,
  id = "Txt",
  name = "",
  onChange = undefined,
  placeholder = "",
  readOnly = false,
  type = "text",
  value = "",
}) => {
  return (
    <div className={styles.Search}>
      <FontAwesomeIcon className={styles["Search-icon"]} icon="search" />

      <div className={styles["Search-field"]}>
        <input
          id={id}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          className={styles["Search-input"]}
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
    </div>
  );
};

export default SearchField;

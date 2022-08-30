import Link from "next/link";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./app-bar-actions.module.scss";

const AppBarActions: FC<Record<string, unknown>> = () => {
  return (
    <div className={styles.AppBarActions}>
      <Link href="/search">
        <a
          id="LnkSearch"
          aria-label="Search"
          className={styles["AppBarActions-button"]}
          role="button"
        >
          <FontAwesomeIcon icon="search" />
        </a>
      </Link>

      <Link href="/archive">
        <a
          id="LnkArchive"
          aria-label="Archive"
          className={styles["AppBarActions-button"]}
          role="button"
        >
          <FontAwesomeIcon icon="archive" />
        </a>
      </Link>
    </div>
  );
};

export default AppBarActions;

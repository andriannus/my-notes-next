import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./app-bar-back-button.module.scss";

interface AppBarBackButtonProps {
  disabled: boolean;
  href: string;
  replace: boolean;
}

const AppBarBackButton: FC<Partial<AppBarBackButtonProps>> = ({
  disabled = false,
  href = "",
  replace = false,
}) => {
  const router = useRouter();

  const hasURL = useMemo(() => !!href, [href]);

  return (
    <>
      {hasURL && (
        <Link href={href} replace={replace}>
          <a
            id="BtnAppBarBack"
            aria-label="Back"
            className={styles["AppBar-backButton"]}
            role="button"
          >
            <FontAwesomeIcon icon="arrow-left" />
          </a>
        </Link>
      )}

      {!hasURL && (
        <button
          id="BtnAppBarBack"
          aria-label="Back"
          className={styles["AppBar-backButton"]}
          disabled={disabled}
          onClick={() => router.back()}
        >
          <FontAwesomeIcon icon="arrow-left" />
        </button>
      )}
    </>
  );
};

export default AppBarBackButton;

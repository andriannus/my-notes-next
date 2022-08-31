import classNames from "classnames";
import Link from "next/link";
import { FC, memo, MouseEventHandler, PropsWithChildren, useMemo } from "react";

import styles from "./button.module.scss";

interface ButtonProps {
  color: "" | "primary" | "success";
  disabled: boolean;
  fullWidth: boolean;
  href: string;
  id: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  outlined: boolean;
  rounded: boolean;
  small: boolean;
  type: "button" | "submit" | "reset";
}

const Button: FC<PropsWithChildren<Partial<ButtonProps>>> = ({
  children,
  color = "",
  disabled = false,
  fullWidth = false,
  href = "",
  id = "",
  onClick = () => {},
  outlined = false,
  rounded = false,
  small = false,
  type = "button",
}) => {
  const hasURL = useMemo(() => !!href, [href]);

  const buttonClasses = classNames([
    {
      [styles[`Button--${color}`]]: !!color,
      [styles["Button--fullWidth"]]: fullWidth,
      [styles["Button--outlined"]]: outlined,
      [styles["Button--rounded"]]: rounded,
      [styles["Button--small"]]: small,
    },
    styles["Button"],
  ]);

  return (
    <>
      {hasURL && (
        <Link href={href}>
          <a className={buttonClasses}>{children}</a>
        </Link>
      )}

      {!hasURL && (
        <button
          id={id}
          className={buttonClasses}
          disabled={disabled}
          type={type}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default memo(Button);

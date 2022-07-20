import { FC, PropsWithChildren } from "react";

import styles from "./app-bar-title.module.scss";

const AppBarTitle: FC<PropsWithChildren> = ({ children }) => {
  return <span className={styles["AppBar-title"]}>{children}</span>;
};

export default AppBarTitle;

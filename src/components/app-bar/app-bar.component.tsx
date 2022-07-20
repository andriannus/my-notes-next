import { FC, PropsWithChildren } from "react";

import styles from "./app-bar.module.scss";

const AppBar: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.AppBar}>{children}</div>;
};

export default AppBar;

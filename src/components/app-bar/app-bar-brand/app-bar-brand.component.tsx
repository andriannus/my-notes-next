import { FC, memo, PropsWithChildren } from "react";

import styles from "./app-bar-brand.module.scss";

const AppBarBrand: FC<PropsWithChildren> = ({ children }) => {
  return <span className={styles["AppBar-brand"]}>{children}</span>;
};

export default memo(AppBarBrand);

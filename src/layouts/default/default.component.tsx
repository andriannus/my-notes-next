import { FC, memo, PropsWithChildren } from "react";

import styles from "./default.module.scss";

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles["DefaultLayout"]}>{children}</div>;
};

export default memo(DefaultLayout);

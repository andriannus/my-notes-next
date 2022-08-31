import { FC, memo, PropsWithChildren } from "react";
import Masonry from "react-masonry-css";

const ReusableMasonry: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Masonry
      breakpointCols={{ default: 3, 480: 1 }}
      className="Notes"
      columnClassName="Note-column"
    >
      {children}
    </Masonry>
  );
};

export default memo(ReusableMasonry);

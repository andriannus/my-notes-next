import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import {
  faArchive,
  faArrowLeft,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/styles/globals.scss";

const DefaultLayout = dynamic(
  () => import("@/layouts/default/default.component"),
  { ssr: false },
);

config.autoAddCss = false;
library.add(faArchive, faArrowLeft, faSearch);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;

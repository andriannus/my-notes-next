import type { NextPage } from "next";
import Head from "next/head";

import { DefaultLayout } from "@/layouts/default";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Catat apapun yang kamu inginkan! - Lagupedia</title>
      </Head>

      <main>Hello World</main>
    </DefaultLayout>
  );
};

export default Home;

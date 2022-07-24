import type { NextPage } from "next";
import Head from "next/head";

import { AppBar, AppBarBrand } from "@/components/app-bar";
import { CreateNote } from "@/components/create-note";
import { DefaultLayout } from "@/layouts/default";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Catat apapun yang kamu inginkan! - myNotes</title>
      </Head>

      <AppBar>
        <AppBarBrand>myNotes</AppBarBrand>
      </AppBar>

      <main>
        <CreateNote />
      </main>
    </DefaultLayout>
  );
};

export default Home;

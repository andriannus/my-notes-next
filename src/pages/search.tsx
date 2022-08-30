import type { NextPage } from "next";
import Head from "next/head";

import { AppBar, AppBarBackButton, AppBarTitle } from "@/components/app-bar";
import { DefaultLayout } from "@/layouts/default";

const Search: NextPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Cari catatan... - myNotes</title>
      </Head>

      <AppBar>
        <AppBarBackButton href="/" />
        <AppBarTitle>Pencarian</AppBarTitle>
      </AppBar>

      <p>Search</p>
    </DefaultLayout>
  );
};

export default Search;

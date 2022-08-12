import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Masonry from "react-masonry-css";

import { AppBar, AppBarBrand } from "@/components/app-bar";
import { CreateNote } from "@/components/create-note";
import { DefaultLayout } from "@/layouts/default";
import { INote, useNote } from "@/hooks/note";

import styles from "@/styles/home.module.scss";

const Home: NextPage = () => {
  const { getNotes } = useNote();

  const [notes, setNotes] = useState([] as INote[]);

  const handleGetNotes = useCallback(() => {
    setNotes(getNotes());
  }, [getNotes]);

  useEffect(() => {
    handleGetNotes();
  }, [handleGetNotes]);

  return (
    <DefaultLayout>
      <Head>
        <title>Catat apapun yang kamu inginkan! - myNotes</title>
      </Head>

      <AppBar>
        <AppBarBrand>myNotes</AppBarBrand>
      </AppBar>

      <main>
        <CreateNote onClose={handleGetNotes} />

        <div className={styles.Container}>
          <Masonry
            breakpointCols={{ default: 3, 480: 1 }}
            className={styles.Notes}
            columnClassName={styles.Note}
          >
            {notes.map((note, index) => {
              return (
                <div key={index}>
                  {note.title && (
                    <p className={styles["Note-title"]}>{note.title}</p>
                  )}

                  <span className={styles["Note-content"]}>{note.content}</span>
                </div>
              );
            })}
          </Masonry>
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Home;

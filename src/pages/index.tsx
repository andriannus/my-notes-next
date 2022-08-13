import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";
import Masonry from "react-masonry-css";

import { AppBar, AppBarBrand } from "@/components/app-bar";
import { CreateNote } from "@/components/create-note";
import { DefaultLayout } from "@/layouts/default";
import { INote, useNote } from "@/hooks/note";

import styles from "@/styles/home.module.scss";

const Home: NextPage = () => {
  const { archiveNote, getNotes } = useNote();

  const [notes, setNotes] = useState([] as INote[]);

  const unarchivedNotes = useMemo(() => {
    return notes.filter((note) => !note.archived);
  }, [notes]);

  const handleGetNotes = useCallback(() => {
    setNotes(getNotes());
  }, [getNotes]);

  useEffect(() => {
    handleGetNotes();
  }, [handleGetNotes]);

  const handleArchiveNote = useCallback(
    (noteId: string) => {
      archiveNote(noteId);
      handleGetNotes();
    },
    [archiveNote, handleGetNotes],
  );

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
          {unarchivedNotes.length < 1 ? (
            <p className="text-center text-gray-500">
              Kamu belum membuat catatan. Yuk, buat sekarang.
            </p>
          ) : (
            <Masonry
              breakpointCols={{ default: 3, 480: 1 }}
              className={styles.Notes}
              columnClassName={styles["Note-column"]}
            >
              {unarchivedNotes.map((unarchivedNote, index) => {
                return (
                  <div key={index} className={styles.Note}>
                    {unarchivedNote.title && (
                      <div className={styles["Note-title"]}>
                        <p>{unarchivedNote.title}</p>
                      </div>
                    )}

                    <div className={styles["Note-content"]}>
                      <span>{unarchivedNote.content}</span>
                    </div>

                    <div className={styles["Note-actions"]}>
                      <button
                        className={styles["Note-action"]}
                        onClick={() => handleArchiveNote(unarchivedNote.id)}
                      >
                        Arsipkan
                      </button>

                      <button className={styles["Note-action"]}>Hapus</button>
                    </div>
                  </div>
                );
              })}
            </Masonry>
          )}
        </div>
      </main>
    </DefaultLayout>
  );
};

export default Home;

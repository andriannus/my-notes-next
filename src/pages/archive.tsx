import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import Masonry from "react-masonry-css";

import { AppBar, AppBarBackButton, AppBarTitle } from "@/components/app-bar";
import { DeleteNoteDialog, SuccessToast } from "@/components/swal";
import { useNote } from "@/hooks/note";

const DefaultLayout = dynamic(
  () => import("@/layouts/default/default.component"),
  { ssr: false },
);

const Archive: NextPage = () => {
  const { archivedNotes, deleteNote, unarchiveNote } = useNote();

  const handleNoteUnarchive = useCallback(
    (noteId: string) => {
      unarchiveNote(noteId);
      SuccessToast("Catatan berhasil dipindah");
    },
    [unarchiveNote],
  );

  const handleNoteDelete = useCallback(
    async (noteId: string) => {
      const result = await DeleteNoteDialog();

      if (result.isConfirmed) {
        deleteNote(noteId);
        SuccessToast("Catatan berhasil dihapus");
      }
    },
    [deleteNote],
  );

  return (
    <>
      <Head>
        <title>Catatan yang diarsipkan - myNotes</title>
      </Head>

      <DefaultLayout>
        <AppBar>
          <AppBarBackButton href="/" />
          <AppBarTitle>Arsip</AppBarTitle>
        </AppBar>

        <main>
          <div className="Container">
            {archivedNotes.length < 1 ? (
              <p className="text-center text-gray-500">
                Catatan yang kamu arsipkan muncul di sini.
              </p>
            ) : (
              <Masonry
                breakpointCols={{ default: 3, 480: 1 }}
                className="Notes"
                columnClassName="Note-column"
              >
                {archivedNotes.map((archivedNote, index) => {
                  return (
                    <div key={index} className="Note">
                      {archivedNote.title && (
                        <div className="Note-title">
                          <p>{archivedNote.title}</p>
                        </div>
                      )}

                      <div className="Note-content">
                        <span>{archivedNote.content}</span>
                      </div>

                      <div className="Note-actions">
                        <button
                          id="ButtonUnarchive"
                          className="Note-action"
                          type="button"
                          onClick={() => handleNoteUnarchive(archivedNote.id)}
                        >
                          Batal arsip
                        </button>

                        <button
                          id="ButtonDelete"
                          className="Note-action"
                          type="button"
                          onClick={() => handleNoteDelete(archivedNote.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Masonry>
            )}
          </div>
        </main>
      </DefaultLayout>
    </>
  );
};

export default Archive;
